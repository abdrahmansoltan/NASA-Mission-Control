// -----------EXPRESS----------- //
const express = require("express");
const app = express();
app.use(express.json()); // parse any incoming JSON from Requests

module.exports = app;
