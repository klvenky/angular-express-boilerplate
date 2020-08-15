const express = require("express");

module.exports = function apiRoutes() {
  return express
    .Router({ mergeParams: true })
    .get("/api", (_req, res) => {
      console.log("got request");
      res.send("hello I am the api");
    })
    .get("/api2", (req, res) => {
      console.log("got request 2");
      const apiRes = {
        path: req.path,
        url: req.originalUrl,
        response: 200,
      };
      res.json(apiRes);
    });
};
