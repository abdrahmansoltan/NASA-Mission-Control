const express = require("express");
const cors = require("cors");
const planetsRouter = require("./routes/planets/planets.router");
const path = require("path");

// CORS
const corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
// ---------------Middlewares--------------- //
app.use(cors(corsOptions)); // Middleware
app.use(express.json()); // Middleware: parse any incoming JSON from Requests

app.use(planetsRouter);

app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
