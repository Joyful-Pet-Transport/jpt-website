// Run: node utils/format/inquirySearch.test.ts
import assert from "node:assert/strict";
import { searchInquiries } from "./inquirySearch.ts";

const rows = [
  { first_name: "Ana", last_name: "Cruz", email: "ana@mail.com", message: "Two cats to Manila", status: "new" },
  { first_name: "Ben", last_name: "Ramos", email: "ben@shop.ph", message: "Dog crate size?", status: "replied" },
  { first_name: "Cara", last_name: "Diaz", email: "cara@mail.com", message: "Quote for a beagle", status: "closed" },
];

const page = (search: string, cursor: string | null = null, numItems = 10) =>
  searchInquiries(rows, search, { numItems, cursor });

// substring, case-insensitive, mid-word — the thing the old gte filter got wrong
assert.deepEqual(page("cru").page.map((r) => r.first_name), ["Ana"]);
assert.deepEqual(page("MAIL.COM").page.map((r) => r.first_name), ["Ana", "Cara"]);
assert.deepEqual(page("beagle").page.map((r) => r.first_name), ["Cara"]);
assert.deepEqual(page("replied").page.map((r) => r.first_name), ["Ben"]);
// full name spans first_name + last_name
assert.deepEqual(page("ben ramos").page.map((r) => r.first_name), ["Ben"]);
// no match means no rows (old filter returned everything alphabetically after)
assert.deepEqual(page("zzz").page, []);
assert.equal(page("zzz").isDone, true);
// blank search passes everything through
assert.equal(page("   ").page.length, 3);

// offset cursor paging
const p1 = page("", null, 2);
assert.deepEqual(p1.page.map((r) => r.first_name), ["Ana", "Ben"]);
assert.equal(p1.isDone, false);
assert.equal(p1.continueCursor, "2");

const p2 = page("", p1.continueCursor, 2);
assert.deepEqual(p2.page.map((r) => r.first_name), ["Cara"]);
assert.equal(p2.isDone, true);

// exact-boundary page is done, not an extra empty page
assert.equal(page("", null, 3).isDone, true);
// junk cursor falls back to the first page
assert.equal(page("", "abc", 2).page.length, 2);

console.log("inquirySearch: all assertions passed");
