import Fuse from "fuse.js";

describe("fuzzy-search", () => {
  it("should search with word snippets", () => {
    const list = [
      { label: "Create timestamp - 10 digit" },
      { label: "Create timestamp - 13 digit" },
      { label: "json to yaml" },
    ];

    const fuse = new Fuse(list, { keys: ["label"] });

    const search = fuse.search("time");

    expect(search.length).toBe(2);
  });
});
