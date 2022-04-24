// to be able to specify PORT in .json file or if it's not specified we use the default: 8000
const PORT = process.env.PORT || 8000;
const http = require("http");
const app = require("./app");

// -----------HTTP Server----------- //
const server = http.createServer(app); // using express as a listening function for the http-server
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
