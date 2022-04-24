const express = require("express");
const httpgetAllLaunches = require("./launches.controller");

const launchesRouter = express.Router();
launchesRouter.get("/launches", httpgetAllLaunches);

module.exports = launchesRouter;
