// const { fs } = require("fs");
const { readFileSync } = require("fs");

module.exports = {
  overview: readFileSync(`././templates/overview.html`, "utf-8"),
  dataStr: readFileSync(`././dev-data/data.json`, "utf-8"),
  eachCard: readFileSync(`././templates/eachCard.html`, "utf-8"),
  product: readFileSync(`././templates/product.html`, "utf-8"),
};

// const {}
