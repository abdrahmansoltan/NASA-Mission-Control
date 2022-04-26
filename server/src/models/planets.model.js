const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const planets = require("./planets.mongo");
const { cachedDataVersionTag } = require("v8");
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

// const habitablePlanets = [];

function loadPlanetsData() {
  // createReadStream --> deal with each row (stream) alone so that we can deal with scalable size --> using streams to handle data as it comes-in
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(parser)
      .on("data", async (data) => {
        if (isHabitable(data)) {
          savePlanet(data);
        }
      })
      .on("err", () => {
        console.log("found an error 🤦‍♀️");
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`found ${countPlanetsFound} planets that are habitable`);
        console.log("done processing files");

        resolve();
      });
  });
}

function getAllPlanets() {
  // find all planets --> {}
  return planets.find({});
}

async function savePlanet(planet) {
  try {
    // soving data to mongo instead of array with upsert (insert + update)
    await planets.updateOne(
      {
        // the filter
        keplerName: planet.kepler_name,
      },
      {
        // the data to insert matching the planets-schema
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`can't save planet ${err}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
