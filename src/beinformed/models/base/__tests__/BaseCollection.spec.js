import BaseCollection from "beinformed/models/base/BaseCollection";

describe("BaseCollection", () => {
  it("should be able to create an empty BaseCollection", () => {
    const collection = new BaseCollection();

    expect(collection.hasItems).toBeFalsy();
    expect(collection.isEmpty).toBeTruthy();
    expect(collection.first).toBeNull();
    expect(collection.size).toBe(0);
    expect(collection).toHaveLength(0);
  });

  it("Can add items", () => {
    const collection = new BaseCollection();

    collection.add(new BaseCollection(["a", "b"]));
    expect(collection).toHaveLength(2);
    expect(collection.first).toBe("a");

    collection.add(["c", "d"]);
    expect(collection).toHaveLength(4);

    collection.add("e");
    expect(collection).toHaveLength(5);

    collection.collection = ["a", "b", "c"];
    expect(collection).toHaveLength(3);

    expect(collection.collection).toEqual(["a", "b", "c"]);
  });

  it("can remove an item by index", () => {
    const collection = new BaseCollection(["aa", "ab", "ac"]);
    collection.removeByIndex(1);
    expect(collection.all).toEqual(["aa", "ac"]);
  });

  it("can replace a collection", () => {
    const collection = new BaseCollection(["a", "b", "c"]);
    collection.collection = ["d", "e", "f"];
    expect(collection.all).toEqual(["d", "e", "f"]);
  });

  it("can check on empty and filled", () => {
    const collection = new BaseCollection();

    expect(collection.isEmpty).toBeTruthy();

    collection.collection = ["a", "b"];

    expect(collection.hasItems).toBeTruthy();
  });

  it("can retrieve first, last and specific item", () => {
    const collection = new BaseCollection(["a", "b", "c"]);

    expect(collection.first).toBe("a");
    expect(collection.last).toBe("c");

    expect(collection.get(0)).toBe("a");
    expect(collection.get(1)).toBe("b");
    expect(collection.get(2)).toBe("c");
  });

  it("can find items", () => {
    const collection = new BaseCollection(["aa", "ab", "ac"]);

    expect(collection.find((item) => item.includes("a"))).toBe("aa");
    expect(collection.find((item) => item.includes("d"))).toBeNull();
    expect(collection.filter((item) => item.includes("a"))).toEqual([
      "aa",
      "ab",
      "ac",
    ]);
  });

  it("can sort", () => {
    const collection = new BaseCollection(["b", "c", "a"]);

    expect(collection.sorted).toEqual(["a", "b", "c"]);
  });

  it("has basic array methods", () => {
    const collection = new BaseCollection(["aa", "ab", "ac"]);

    // filter
    expect(collection.filter((item) => item !== "aa")).toEqual(["ab", "ac"]);

    // some
    expect(collection.some((item) => item === "aa")).toBeTruthy();
    expect(collection.some((item) => item === "bb")).toBeFalsy();

    // every
    expect(collection.every((item) => item.startsWith("a"))).toBeTruthy();
    expect(collection.every((item) => item.endsWith("a"))).toBeFalsy();

    // map
    expect(collection.map((item) => `${item}a`)).toEqual(["aaa", "aba", "aca"]);
  });
});
