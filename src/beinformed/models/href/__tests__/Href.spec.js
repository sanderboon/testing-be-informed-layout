import Href from "beinformed/models/href/Href";

describe("Href spec", () => {
  it("should create an empty href when not data is set", () => {
    const href = new Href();

    expect(href.getParameter("nonexistedKey")).toBeUndefined();
    expect(href.parameters).toHaveLength(0);
    expect(href.querystring).toBe("");
    expect(href.path).toBe("");
    expect(href.href).toBe("");
    expect(href.absolutehref).toBe("/BeInformed");
    expect(href.startsWith("/nonexists")).toBeFalsy();
  });

  it("should create a href from a typical link href", () => {
    const href = new Href("/casetab/caseview");

    expect(href.getParameter("nonexistedKey")).toBeUndefined();
    expect(href.parameters).toHaveLength(0);
    expect(href.querystring).toBe("");
    expect(href.path).toBe("/casetab/caseview");
    expect(href.href).toBe("/casetab/caseview");
    expect(href.absolutehref).toBe("/BeInformed/casetab/caseview");
    expect(href.startsWith(new Href("/casetab"))).toBeTruthy();
  });

  it("should create a href with querystring from a typical link href", () => {
    const href = new Href("/casetab/caseview?key=value&key2=value2");

    expect(href.getParameter("key").value).toBe("value");
    expect(href.parameters).toHaveLength(2);
    expect(href.querystring).toBe("key=value&key2=value2");
    expect(href.path).toBe("/casetab/caseview");
    expect(href.href).toBe("/casetab/caseview?key=value&key2=value2");
    expect(href.absolutehref).toBe(
      "/BeInformed/casetab/caseview?key=value&key2=value2"
    );
    expect(href.startsWith(new Href("/casetab"))).toBeTruthy();
  });

  it("should be able to change querystring parameters", () => {
    const href = new Href("/casetab/caseview?key=value&key2=value2");

    href.setParameter("key3", "value3");
    expect(href.getParameter("key3").value).toBe("value3");

    expect(href.getParameter("key2").value).toBe("value2");
    href.setParameter("key2", "value2-changed");
    expect(href.getParameter("key2").value).toBe("value2-changed");

    href.removeParameter("key");
    expect(href.getParameter("key")).toBeUndefined();
    expect(href.querystring).toBe("key3=value3&key2=value2-changed");
  });

  it("should be able to server hrefs with spaces", () => {
    const href = new Href(
      "/concepts/Content/Knowledge models/All source types.bixml/AllKindOfSources"
    );

    expect(href.path).toBe(
      "/concepts/Content/Knowledge models/All source types.bixml/AllKindOfSources"
    );

    const href2 = new Href(
      "/concepts/Content/Knowledge%20models/All%20source%20types.bixml/AllKindOfSources"
    );

    expect(href2.path).toBe(
      "/concepts/Content/Knowledge models/All source types.bixml/AllKindOfSources"
    );
  });

  it("should be able to create an Href from an Href", () => {
    const href = new Href(
      "/concepts/Content/Knowledge models/All source types.bixml/AllKindOfSources"
    );
    const href2 = new Href(href);

    expect(href2.path).toBe(
      "/concepts/Content/Knowledge models/All source types.bixml/AllKindOfSources"
    );
  });

  it("can check for equal hrefs with or without parameters", () => {
    const baseHref = new Href("/url?param1=value1");
    const sameHref = new Href("/url?param1=value1");
    const samePathHref = new Href("/url?param1=value2");
    const otherHref = new Href("/path?param1=value1");

    expect(baseHref.equals(sameHref)).toBeTruthy();
    expect(baseHref.equals(samePathHref)).toBeTruthy();
    expect(baseHref.equals(otherHref)).toBeFalsy();

    expect(baseHref.equalsWithParameters(sameHref)).toBeTruthy();
    expect(baseHref.equalsWithParameters(samePathHref)).toBeFalsy();
    expect(baseHref.equalsWithParameters(otherHref)).toBeFalsy();
  });

  it("can make distinction between relative and absolute urls", () => {
    expect(Href.getPathFromString("/BeInformed/")).toBe("/");

    expect(
      Href.getPathFromString("http://BeInformed.u.example.com/BeInformed/")
    ).toBe("http://BeInformed.u.example.com/BeInformed/");
    expect(
      Href.getPathFromString("http://BeInformed.u.example.com/BeInformed/page1")
    ).toBe("http://BeInformed.u.example.com/BeInformed/page1");
    expect(
      Href.getPathFromString(
        "http://BeInformed.u.example.com/BeInformed/page2?qs=bla"
      )
    ).toBe("http://BeInformed.u.example.com/BeInformed/page2");
    expect(
      Href.getPathFromString(
        "http://BeInformed.u.example.com/BeInformed/page2?qs=bla&domain=http://BeInformed.com"
      )
    ).toBe("http://BeInformed.u.example.com/BeInformed/page2");

    expect(
      Href.getPathFromString("//BeInformed.u.example.com/BeInformed/")
    ).toBe("//BeInformed.u.example.com/BeInformed/");
    expect(Href.getPathFromString("/?domain=http://BeInformed.com")).toBe("/");

    const href = new Href("https://google.com/page1");
    expect(href.absolutepath).toBe("https://google.com/page1");
  });
});
