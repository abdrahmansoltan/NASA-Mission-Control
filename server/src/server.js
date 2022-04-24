// to be able to specify PORT in .json file or if it's not specified we use the default: 8000
const PORT = process.env.PORT || 8000;
const http = require("http");
const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

// -----------HTTP Server----------- //
const server = http.createServer(app); // using express as a listening function for the http-server

async function startServer() {
  // this is done so that we have the data ready when we start the server before any requests so that it's available for any request
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
  });
}
startServer();
