import { removeUnwantedHtml } from "../sanitizeHtml";

describe("sanitizeHTML", () => {
  it("remove unwanted html", () => {
    expect(removeUnwantedHtml("String without HTML")).toBe(
      "String without HTML"
    );

    expect(
      removeUnwantedHtml("<p>String with <b>allowed <i>html</i></b></p>")
    ).toBe("<p>String with <b>allowed <i>html</i></b></p>");

    expect(
      removeUnwantedHtml(
        "<p>String with <b>allowed <i>html</i></b><br /> and <strong>NOT</strong> allowed html</p>"
      )
    ).toBe(
      "<p>String with <b>allowed <i>html</i></b><br /> and NOT allowed html</p>"
    );

    expect(
      removeUnwantedHtml("String<p><br /> with <u>allowed</u></p> html")
    ).toBe("String<p><br /> with <u>allowed</u></p> html");

    expect(
      removeUnwantedHtml(
        '<p>String <b style="font-weight: 400" id="bold">not allowed attribute</b> string</p>'
      )
    ).toBe("<p>String <b>not allowed attribute</b> string</p>");
  });
});
