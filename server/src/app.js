const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const api = require("./routes/api");

// CORS
const corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
// ---------------Middlewares--------------- //
app.use(cors(corsOptions)); // Middleware
// app.use(morgan("combined")); // logging Middleware
app.use(express.json()); // Middleware: parse any incoming JSON from Requests

app.use("/v1", api);

// ---------------FOR PRODUCTION--------------- //
app.use(express.static(path.join(__dirname, "..", "public"))); // Middleware
// we use "*" --> so that it matches all routes from the code in the client-side
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
