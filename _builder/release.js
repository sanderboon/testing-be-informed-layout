const proc = require("process");
const exec = require("child_process").exec;
const fs = require("fs");
const inquirer = require("inquirer");

const paths = require("./util/paths");

const configFile = paths.builder + "/config.json";
const config = JSON.parse(fs.readFileSync(configFile, "utf8"));

const packageFile = paths.root + "/package.json";
const packageJSON = JSON.parse(fs.readFileSync(packageFile, "utf8"));

const manifestFile = paths.root + "/META-INF/MANIFEST.MF";

function getMsg(message = "") {
  const msg = message.split("\n");

  const result = msg[0].match(
    /^(?<type>.*?)(?<opt>\((?<group>.*)\))?:(?<msg>.*)/i
  );

  const closes = msg.find((m) => m.toLowerCase().includes("closes"));
  let issue = null;

  if (closes) {
    const m = closes.match(/^closes:?\s(?<issue>.*)/i);
    issue = m ? m.groups.issue : null;
  }

  if (!result) {
    return { type: "other", group: "other", msg: message, issue };
  }

  return {
    type: result.groups.type,
    group: result.groups.group || "other",
    msg: result.groups.msg.trim(),
    issue,
  };
}

function transformLogs(logs) {
  const commitsArray = logs
    .split("----DELIMITER----\n")
    .map((commit) => {
      const [sha, message = ""] = commit.split("----SEPARATOR----");

      const msgItems = getMsg(message);
      return {
        sha,
        ...msgItems,
      };
    })
    .filter(
      (commit) =>
        Boolean(commit.sha) &&
        Boolean(commit.type) &&
        Boolean(commit.group) &&
        Boolean(commit.msg)
    );

  const commits = {};
  commitsArray.forEach(({ sha, type, group, msg, issue }) => {
    if (!commits[type]) {
      commits[type] = {};
    }

    if (!commits[type][group]) {
      commits[type][group] = {};
    }

    if (!commits[type][group][msg]) {
      commits[type][group][msg] = { sha: new Set(), issue: new Set() };
    }

    commits[type][group][msg].sha.add(sha);

    if (issue) {
      commits[type][group][msg].issue.add(issue);
    }
  });

  return commits;
}

function gitCmd(cmd) {
  var options = Object.assign({ maxBuffer: Infinity, cwd: proc.cwd() });

  return new Promise((resolve, reject) => {
    exec(cmd, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function gitLog(logCmd) {
  return gitCmd("git rev-parse --abbrev-ref HEAD")
    .then((currentBranch) => currentBranch.trim())
    .then((currentBranch) => gitCmd(`git log ${currentBranch} ${logCmd}`));
}

function getLogs(fromDate = "", toDate = "") {
  const fromDateEnd = new Date(fromDate);
  fromDateEnd.setHours(23, 59, 59, 999);

  const toDatePlusOne = new Date(toDate);
  toDatePlusOne.setDate(toDatePlusOne.getDate() + 1);
  toDatePlusOne.setHours(0, 0, 0, 0);

  return gitLog(
    `--after "${fromDateEnd}" --before "${toDatePlusOne}" --format=%H----SEPARATOR----%B----DELIMITER----`
  ).then((logs) => transformLogs(logs));
}

function writeSha(sha) {
  return `[${sha.substring(0, 6)}](${config.refUrl}${sha})`;
}

function writeIssue(issue) {
  return `[${issue}](${config.issueUrl}${issue})`;
}

function getEntries(logs, type, title) {
  if (!logs[type]) {
    return "";
  }

  let newEntry = `\n### ${title}\n\n`;

  Object.entries(logs[type]).forEach(([group, entries]) => {
    newEntry += `- **${group.toLowerCase()}**\n`;

    Object.entries(entries).forEach(([msg, links]) => {
      newEntry += `  - ${msg}`;

      if (links.issue.size > 0) {
        newEntry += ` - ${[...links.issue].map(writeIssue).join(", ")}`;
      }

      newEntry += ` (${[...links.sha].map(writeSha).join(", ")})`;
      newEntry += `\n`;
    });
  });

  return newEntry;
}

function generateChangeLog(newVersion, logs, releaseDate) {
  let newChangelog = `## ${newVersion} (${releaseDate.split("T")[0]})\n`;

  newChangelog += getEntries(logs, "feat", "Features");
  newChangelog += getEntries(logs, "fix", "Bug fixes");
  newChangelog += getEntries(logs, "style", "Style");
  newChangelog += getEntries(logs, "docs", "Documentation");
  newChangelog += getEntries(logs, "refactor", "Refactor");
  newChangelog += getEntries(logs, "perf", "Performance");
  newChangelog += getEntries(logs, "test", "Tests");
  newChangelog += getEntries(logs, "build", "Build");

  return newChangelog;
}

function getReleases() {
  return gitLog("--format=%B%H,%cI----DELIMITER---- --reverse").then((logs) => {
    const regex = /chore\(release\):.*?@?(\d.*)/gi;

    let releases = [];

    logs.split("----DELIMITER----\n").forEach((commit) => {
      const [message, shadate] = commit.split("\n");
      let sha, date;
      if (shadate) {
        [sha, date] = shadate.split(",");
      }

      let releaseLine;
      while ((releaseLine = regex.exec(message.trim()))) {
        const release = releaseLine[1];
        if (sha !== "" && releases.every((rel) => rel.release !== release)) {
          releases.push({ release, sha, date });
        } else if (sha !== "") {
          releases = releases.map((rel) => ({
            ...rel,
            date: rel.release === release ? date : rel.date,
          }));
        }
      }
    });

    return releases.reverse();
  });
}

function mapBiVersion(version) {
  switch (version) {
    case "4.7.0":
      return "19.2.5";
    case "4.6.3":
      return "19.2.4";
    case "4.6.2":
      return "19.2.3";
    case "4.6.1":
      return "19.2.2";
    case "4.6.0":
      return "19.2.1";
    case "4.5.0":
      return "19.2.0";
    case "4.2.0":
      return "19.1.0";
    case "4.1.0":
      return "19.0.1";
    case "4.0.0":
      return "19.0.0";
    case "3.0.0":
      return "3.16.2";
    case "2.0.0":
      return "3.16.2";
    case "1.0.0":
      return "3.16.1";
    default:
      return version;
  }
}

function generateLog(initReleases, version) {
  const releases = initReleases.filter(
    (release) => release.release !== version
  );

  const changelogs = releases.map((release, i) => {
    if (i === 0) {
      return getLogs(release.date, new Date().toISOString()).then((logs) => {
        return generateChangeLog(version, logs, new Date().toISOString());
      });
    } else {
      const toRelease = releases[i - 1];
      return getLogs(release.date, toRelease.date).then((logs) => {
        const biVersion = mapBiVersion(toRelease.release);
        return generateChangeLog(biVersion, logs, toRelease.date);
      });
    }
  });

  return Promise.all(changelogs).then((allChangelogs) => {
    const changelog = allChangelogs.join("\n");

    const newChangeLog = `# Changelog\n\nAll notable changes to this project will be documented in this file.\nSee [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.\n\n${changelog}`; // NOSONAR

    // prepend the newChangelog to the current one
    return new Promise((resolve, reject) => {
      fs.writeFile(paths.root + "/CHANGELOG.md", newChangeLog, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Finished");
        }
      });
    });
  });
}

function writeFile(fileLocation, fileContent) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileLocation, fileContent, function (err) {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}

function updateConfigJson(version) {
  config.bundleVersion = version;

  return writeFile(configFile, JSON.stringify(config, null, 2));
}

function updatePackageJson(version, versionText) {
  packageJSON.biVersion = version;
  packageJSON.biVersionText = versionText;

  return writeFile(packageFile, JSON.stringify(packageJSON, null, 2));
}

function updateManifest(version) {
  const manifest = `Manifest-Version: 1.0
Bundle-ManifestVersion: 2
Bundle-Name: ${config.bundleLabel}
Bundle-SymbolicName: ${config.bundleSymbolicName};singleton:=true
Bundle-Version: ${version}.qualifier
Bundle-Vendor: Be Informed B.V.
Bundle-ClassPath: .
Require-Bundle: nl.beinformed.bi.pluggablelayout
  
`;
  return writeFile(manifestFile, manifest);
}

function createRelease(version, versionText, createCommit, createTag) {
  // update config.json en package.json
  return Promise.all([
    updateConfigJson(version),
    updatePackageJson(version, versionText),
    updateManifest(version),
  ]).then(() => {
    // THE releaseMsg IS IMPORTANT, IT IS USED TO FIND VARIOUS RELEASES IN THE getReleases METHOD!!
    const releaseMsg = `chore(release): ${config.bundleSymbolicName}@${version}`;
    const commit = `git commit ./CHANGELOG.md ./package.json ./_builder/config.json ./META-INF/MANIFEST.MF -m "${releaseMsg}"`;
    const tag = `git tag -a ${config.releaseTagPrefix}-${version} -m "${releaseMsg}"`;

    if (createCommit && createTag) {
      return gitCmd(commit).then(() => {
        return gitCmd(tag)
          .then(() => {
            console.info(
              `tag v${version} created, don't forget to push to remote with git push --follow-tags`
            );
          })
          .catch((e) => console.error(e));
      });
    }

    if (createCommit) {
      return gitCmd(commit).then(() => {
        console.info(`commit: ${releaseMsg} created`);
      });
    }

    if (createTag) {
      return gitCmd(tag)
        .then(() => {
          console.info(
            `tag v${version} created, don't forget to push to remote with git push --follow-tags`
          );
        })
        .catch((e) => console.error(e));
    }
  });
}

const inquire = () =>
  getReleases().then((releases) => {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "version",
          message:
            "Version number for this release? (needs to be major.minor.patch)",
          default: config.bundleVersion || packageJSON.biVersion,
          validate: (version) => {
            const regex = new RegExp(
              "^([0-9]|[1-9][0-9]*)\\.([0-9]|[1-9][0-9]*)\\.([0-9]|[1-9][0-9]*)(?:-([0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*))?(?:\\+[0-9A-Za-z-]+)?$"
            );

            if (!regex.test(version)) {
              return "Must be a valid semver number, in the form of major.minor.patch. For example 1.0.0";
            }

            return true;
          },
        },
        {
          type: "input",
          name: "versionText",
          message: "Version text for this release?",
          default: packageJSON.biVersionText,
        },
        {
          type: "confirm",
          name: "createreleasecommit",
          message: "Create a new release commit?",
          default: false,
        },
        {
          type: "confirm",
          name: "createreleasetag",
          message:
            "Create a new release tag? Updates config.json, package.json en manifest.mf",
          default: false,
        },
      ])
      .then(
        ({ version, versionText, createreleasecommit, createreleasetag }) => {
          return generateLog(releases, version).then(() => {
            if (createreleasecommit || createreleasetag) {
              return createRelease(
                version,
                versionText,
                createreleasecommit,
                createreleasetag
              ).then(() => {
                if (createreleasetag) {
                  console.info(
                    `tag v${version} created, don't forget to push to remote with git push --follow-tags`
                  );
                }
              });
            } else {
              return Promise.resolve();
            }
          });
        }
      );
  });

inquire();
