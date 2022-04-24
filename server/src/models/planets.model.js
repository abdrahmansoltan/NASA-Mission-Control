const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

// Helpers
const parser = parse({
  // options
  comment: "#",
  columns: true, // now each row will be treaded as a js-object (key-value)
});
const isHabitable = (planet) => {
  return (
    planet.koi_disposition === "CONFIRMED" &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  );
};

const habitablePlanets = [];

function loadPlanetsData() {
  // createReadStream --> deal with each row (stream) alone so that we can deal with scalable size --> using streams to handle data as it comes-in
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(parser)
      .on("data", (data) => {
        if (isHabitable(data)) {
          habitablePlanets.push(data); // results are RAW-Buffers of Bytes so we need to parse it
        }
      })
      .on("err", () => {
        console.log("found an error 🤦‍♀️");
        reject(err);
      })
      .on("end", () => {
        // console.log(
        //   `found ${habitablePlanets.length} planets that are habitable they are : ${planetNames}`
        // );
        console.log("done processing files");

        resolve();
      });
  });
}

function getAllPlanets() {
  return habitablePlanets;
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
