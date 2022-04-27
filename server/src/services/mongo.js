const mongoose = require("mongoose");

// -----------MONGODB----------- //
const MONGO_URL = process.env.MONGO_URL;
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
