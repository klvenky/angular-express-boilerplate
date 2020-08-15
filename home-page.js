const fs = require("fs");
const path = require("path");

const distPath = "../AflICE/dist/aflIce/index.html";
const newPath = path.join(__dirname, distPath);
const indexFile = fs.readFileSync(newPath).toString();
const isDev = process.env.NODE_ENV === "production";
module.exports = function homePage(_req, res) {
  const replaceWith = isDev
    ? '<script src="http://localhost:4200/'
    : '<script src="dist/';
  const html = indexFile.replace(/<script src=\"/g, replaceWith);
  const minified = html.replace(/(\t)+/g, "");
  console.log({ isDev, minified });
  res.send(minified);
};
