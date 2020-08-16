const express = require("express");
const homePage = require('./home-page');
const apiRoutes = require("./routes");
const path =require('path');

const port = 4000;
const distFolder = "../AflICE/dist/aflIce";
const distPath = path.join(__dirname, distFolder);

async function main() {
  console.log("started exec main");
  const app = express()
    .use("/api", apiRoutes())
    .use('/dist', express.static(distPath))
    .use("/", homePage)
    .use((req,res) =>{
      res.status(404).send(`
        <h3>Route not found!!</h3>
        <p>${req.originalUrl}</p>
      `)
    })

  app.listen(port, function () {
    console.log(`listening on http://localhost:${port}`);
  });

  function stopServer() {
    console.log("stopping server");
    app.close();
  }
  process.once("SIGTERM", stopServer);
  process.once("SIGINT", stopServer);
}
main().catch(function (e) {
  console.log(e);
});
