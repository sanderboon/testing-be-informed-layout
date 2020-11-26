import { noop } from "lodash";

import xhr from "../xhr";

import {
  FetchException,
  UnauthorizedException,
  TimeoutException,
  NotFoundException,
  JsonParseException,
} from "beinformed/exceptions";
import xhrMock from "xhr-mock";
import Cache from "../../browser/Cache";

describe("xhr", () => {
  // replace the real XHR object with the mock XHR object before each test
  beforeEach(() => xhrMock.setup());

  // put the real XHR object back and clear the mocks after each test
  afterEach(() => xhrMock.teardown());

  it("handles simple get requests", () => {
    expect.assertions(2);

    xhrMock.get("/", (req, res) => {
      expect(req.header("accept")).toBe("application/json");
      expect(req.header("Content-Type")).toBe("application/json");

      return res.status(200).body({ data: "ok" });
    });

    return xhr({ url: "/" });
  });

  it("should throw when nothing is set or url is missing", () => {
    expect(() => xhr()).toThrow();
    expect(() => xhr("/")).toThrow();
    expect(() => xhr({})).toThrow();
  });

  it("adds encoded params to the url", () => {
    expect.assertions(2);

    xhrMock.use("get", "/test?param1=one&param2=tw%C3%B6", (req, res) => {
      const { path, query } = req.url();

      expect(path).toBe("/test");
      expect(query).toEqual({
        param1: "one",
        param2: "twö",
      });

      return res.status(200);
    });

    xhr({
      url: "/test",
      params: "param1=one&param2=twö",
    });
  });

  it("adds encoded params to a url with querystring", () => {
    expect.assertions(2);

    xhrMock.use(
      "get",
      "/test?param1=one&param2=two&param3=thr%C3%A9%C3%AB",
      (req, res) => {
        const { path, query } = req.url();

        expect(path).toBe("/test");
        expect(query).toEqual({
          param1: "one",
          param2: "two",
          param3: "thréë",
        });

        return res.status(200).body({});
      }
    );

    return xhr({
      url: "/test?param1=one",
      params: "param2=two&param3=thréë",
    });
  });

  it("handles json response", () => {
    expect.assertions(1);

    xhrMock.get("/", {
      status: 200,
      body: {
        type: "root",
      },
    });

    return xhr({ url: "/" }).then((response) => {
      expect(response).toEqual({ type: "root" });
    });
  });

  it("return JsonParseException when response is not valid json and responseType is text", () => {
    expect.assertions(2);

    xhrMock.get("/", {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: "root",
    });

    return xhr({ url: "/", responseType: "text" })
      .then(() => {
        console.error("not expected");
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(JsonParseException);
        expect(error.name).toBe("JsonParseException");
      });
  });

  it("can handle modular ui form responses", () => {
    expect.assertions(1);

    xhrMock.post("/form", {
      status: 400,
      body: {
        formresponse: {
          form: "response",
        },
      },
    });

    return xhr({ url: "/form", method: "post", data: "{}" }).then(
      (response) => {
        expect(response).toEqual({ formresponse: { form: "response" } });
      }
    );
  });

  it("can handle progress events", async () => {
    expect.assertions(1);

    xhrMock.post("/", {
      status: 200,
      headers: {
        "Content-Length": "12",
      },
      body: "Hello world!",
    });

    const progressEvents = new Promise((resolve) => {
      const events = [];

      xhr({
        url: "/",
        method: "post",
        onProgress: ({ type, loaded, total, lengthComputable }) => {
          events.push({ type, loaded, total, lengthComputable });

          if (type === "loadend") {
            resolve(events);
          }
        },
        data: "Upload data",
        headers: {
          "Content-Length": "11",
        },
      });
    });

    await expect(progressEvents).resolves.toEqual([
      {
        type: "loadstart",
        lengthComputable: false,
        loaded: 0,
        total: 0,
      },
      {
        type: "progress",
        lengthComputable: true,
        loaded: 12,
        total: 12,
      },
      {
        type: "load",
        lengthComputable: true,
        loaded: 12,
        total: 12,
      },
      {
        type: "loadend",
        lengthComputable: true,
        loaded: 12,
        total: 12,
      },
    ]);
  });

  it("handles error response", () => {
    expect.assertions(3);
    xhrMock.get("/", {
      status: 500,
      reason: "Internal Server Error",
      body: {
        error: {
          id: "Error.GeneralError",
        },
      },
    });

    return xhr({ url: "/" })
      .then(() => {
        console.error("not expected");
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(FetchException);
        expect(error.status).toBe(500);
        expect(error.id).toBe("Error.GeneralError");
      });
  });

  it("handles not found response", () => {
    expect.assertions(3);
    xhrMock.get("/", {
      status: 404,
    });

    return xhr({ url: "/" })
      .then(() => {
        console.error("not expected");
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.id).toBe("NotFoundException");
      });
  });

  it("handles unauthorized response", () => {
    expect.assertions(3);
    xhrMock.get("/", {
      status: 401,
    });

    return xhr({ url: "/" })
      .then(() => {
        console.error("not expected");
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.status).toBe(401);
        expect(error.id).toBe("UnauthorizedException");
      });
  });

  it("handles unauthorized and unexpected response", () => {
    expect.assertions(1);
    xhrMock.get("/", {
      status: 401,
      body: {
        has: "body?",
      },
    });

    return xhr({ url: "/" })
      .then(() => {
        console.error("not expected");
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(UnauthorizedException);
      });
  });

  it("handles basic authentication", () => {
    expect.assertions(1);

    xhrMock.get("/", (req, res) => {
      expect(req.header("Authorization")).toBe("Basic abcdef");
      return res.status(200);
    });

    Cache.addItem("basic", "abcdef");

    xhr({ url: "/" });
  });

  it("handles timeouts", () => {
    expect.assertions(2);

    xhrMock.get("/", () => new Promise(noop));

    return xhr({ url: "/", timeout: 2000 })
      .then(() => {
        console.error("not expected");
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(TimeoutException);
        expect(error.name).toBe("TimeoutException");
      });
  });
});
