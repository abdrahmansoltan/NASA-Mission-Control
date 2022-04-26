// to be able to specify PORT in .json file or if it's not specified we use the default: 8000
const PORT = process.env.PORT || 8000;
const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

const { loadPlanetsData } = require("./models/planets.model");

// -----------MONGODB----------- //
const MONGO_URL = `mongodb+srv://nasa-api:fHIRUYJcfKCaRafC@nasacluster.44pi6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const mongoOptions = {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// };

// -----------Mongoose----------- //
mongoose.connection.once("open", () => {
  console.log("MongoDB connection is ready!");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});

// -----------HTTP Server----------- //
const server = http.createServer(app); // using express as a listening function for the http-server

async function startServer() {
  // MONGODB
  await mongoose.connect(MONGO_URL);

  // this is done so that we have the data ready when we start the server before any requests so that it's available for any request
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
  });
}
startServer();
