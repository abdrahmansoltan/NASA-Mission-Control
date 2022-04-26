const mongoose = require("mongoose");

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

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}
async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
