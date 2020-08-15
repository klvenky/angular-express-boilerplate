const express = require("express");
const apiRoutes = require("./routes");

const port = 4000;

async function main() {
  console.log("started exec main");
  const app = express()
    .use(function (req, _res, next) {
      console.log("received request");
      console.log({ path: req.path, url: req.originalUrl });
      next();
    })
    .use("/api", apiRoutes())
    .use("/ui", function (_req, res) {
      res.send("hello, I am the frontend");
    })
    .use('/index.html', express.static("client/index.html"));

  app.listen(port, function () {
    console.log(`listening on http://localhost:${port}`);
  });

  console.log("listen done");
  function stopServer() {
    console.log("stopping server");
    app.close();
  }
  process.once("SIGTERM", stopServer);
  process.once("SIGINT", stopServer);
  console.log("setup process quitters");
}
main().catch(function (e) {
  console.log(e);
});
