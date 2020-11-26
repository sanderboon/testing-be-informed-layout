import PagesizeModel from "beinformed/models/paging/PagesizeModel";

describe("PagesizeModel", () => {
  it("should be able to create an empty Pagesize instance", () => {
    const pagesize = new PagesizeModel();

    expect(pagesize).toBeInstanceOf(PagesizeModel);

    expect(pagesize.options).toEqual([]);
    expect(pagesize.name).toBe("pagesize");
    expect(pagesize.value).toBeUndefined();
  });

  it("can consume a typical modular UI json pagesize structure", () => {
    const pagesize = new PagesizeModel(50, {
      options: [10, 25, 50],
    });

    expect(pagesize.options).toEqual([10, 25, 50]);
    expect(pagesize.value).toBe(50);
  });

  it("can change pagesize", () => {
    const pagesize = new PagesizeModel(50, {
      options: [10, 25, 50],
    });

    pagesize.value = 2;
    expect(pagesize.value).toBe(2);
  });
});
