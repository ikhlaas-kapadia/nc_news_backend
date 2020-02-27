const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments,
  checkExists
} = require("../utils");

describe("formatDates", () => {
  it("returns an empty array when passed an empty array", () => {
    const input = [];
    const output = [];
    expect(formatDates(input)).to.eql(output);
  });
  it("returns an array of objects with created_at time property changed from unix format to JS format", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const output = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(input[0].created_at),
        votes: 100
      }
    ];
    expect(formatDates(input)).to.eql(output);
  });
});

describe("makeRefObj", () => {
  it("returns an empty object when passed an empty array", () => {
    const input = [];
    const output = {};
    expect(makeRefObj(input)).to.eql(output);
  });
  it("returns an empty object with reference when passed an array with one element", () => {
    const input = [{ article_id: 1, title: "A" }];
    const output = { A: 1 };
    expect(makeRefObj(input)).to.eql(output);
  });
  it("returns an empty object with reference when passed an array with multiple element", () => {
    const input = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" },
      { article_id: 3, title: "C" }
    ];
    const output = { A: 1, B: 2, C: 3 };
    expect(makeRefObj(input)).to.eql(output);
  });
});

describe("formatComments", () => {
  it("returns a new array when passed empty array", () => {
    const input = [];
    const ref = {};
    const output = [];
    expect(formatComments(input), ref).to.eql(output);
  });
  it("returns a new array when passed anray of single object", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const ref = { "They're not exactly dogs, are they?": 1 };
    const output = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 1,
        author: "butter_bridge",
        votes: 16,
        created_at: new Date(input[0].created_at)
      }
    ];
    expect(formatComments(input, ref)).to.eql(output);
    expect(input).to.not.equal(output);
  });
});

describe("checkExists", () => {
  it("returns true or false if an array is empty", () => {});
});
