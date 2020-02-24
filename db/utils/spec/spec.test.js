const { expect } = require("chai");
const { formatDates } = require("../utils");

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
    expect(input.created_at).to.equal(output.created_at);
  });
});
