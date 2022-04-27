const axios = require("axios");
const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo"); // to get the planets list

// const launches = new Map();
// let latestFlightNumber = 100;
const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100, // flight_number
  mission: "Kepler Exploration X", // name
  rocket: "Explorer IS1", // rocket.name
  launchData: new Date("December 27, 2030"), // date_local
  target: "Kepler-442 b", // not applicable
  customers: ["ZTM", "NASA"], // payload.customers for each payload
  upcoming: true, // upcoming
  success: true, // success
};

//--------GETTING ALL PREVIOS LAUNCHES--------//
// from: https://github.com/r-spacex/SpaceX-API/tree/master/docs#rspacex-api-docs
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunches() {
  console.log("downloading launch data...");
  const response = await axios.post(SPACEX_API_URL, {
    // options to get rocket's name
    query: {},
    options: {
      pagination: false, // to show all launches in all pages and not only showing the launches in each page
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.log("problem downloading launc data");
    throw new Error("launch data download failed");
  }

  const launchDocs = response.data.docs;
  launchDocs.forEach(async (launchDoc) => {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };

    console.log(launch.flightNumber, launch.mission);

    // populate launches collection
    await saveLaunch(launch);
  });
}

async function loadLaunchData() {
  // First: check if launches have been already loaded before to reduce traffic
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (firstLaunch) {
    console.log("launch data already loaded");
  } else {
    await populateLaunches();
  }
}

// we use flightNumber as a key as it's Unique
// launches.set(launch.flightNumber, launch);

async function findLaunch(filter) {
  return await launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId) {
  // return launches.has(launchId); // true/false
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  }); // true / false
}

async function getlatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber"); // sort by the property: "flightNumber" in descending order (-)  and returning the first one

  // if there's no launches in the database
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

// to make the model responsible of outputing clean and ready data
async function getAllLaunches() {
  // return Array.from(launches.values());
  return await launchesDatabase.find({}, { _id: 0, __v: 0 }); // find all documents without showng the id or veersion-key in the response
}

//--------------- inserting new launch----------------- //
// using mongoDB
async function saveLaunch(launch) {
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

saveLaunch(launch);

async function scheduleNewLaunch(launch) {
  // checking for integrity as if the planet's name exists in the database
  const planet = await planets.findOne({
    keplerName: launch.target,
  }); // the filter says that the "launch.target" must be from the names of the planets (keplerName) from planets database
  if (!planet) {
    throw new Error(`No matching planet was found`);
  }

  const newFlightNumber = (await getlatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["ZTM", "NASA"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

// function addNewLaunch(launch) {
//   latestFlightNumber++;
//   launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       success: true,
//       upcoming: true,
//       customer: ["ZTM", "NASA"],
//       flightNumber: latestFlightNumber,
//     })
//   );
// }

async function abortLaunchById(launchID) {
  // const aborted = launches.get(launchID);
  // aborted.upcoming = false;
  // aborted.success = false;
  // return aborted;

  // MongoDB : we will update the item matching the launchId
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchID,
    },
    {
      // the properties we want to change (change to this:)
      upcoming: false,
      success: false,
    }
  );
  return aborted.acknowledged === true && aborted.modifiedCount === 1;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  // addNewLaunch,
  scheduleNewLaunch,
  abortLaunchById,
  loadLaunchData,
};
