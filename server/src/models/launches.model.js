const launchesDatebase = require("./launches.mongo");
const planets = require("./planets.mongo"); // to get the planets list

const launches = new Map();
// let latestFlightNumber = 100;
const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X", // from user
  rocket: "Explorer IS1", // from user
  launchData: new Date("December 27, 2030"), // from user
  target: "Kepler-442 b", // from user
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// we use flightNumber as a key as it's Unique
// launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
  console.log(launches);
  return launches.has(launchId); // true/false
}

async function getlatestFlightNumber() {
  const latestLaunch = await launchesDatebase.findOne().sort("-flightNumber"); // sort by the property: "flightNumber" in descending order (-)  and returning the first one

  // if there's no launches in the database
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

// to make the model responsible of outputing clean and ready data
async function getAllLaunches() {
  // return Array.from(launches.values());
  return await launchesDatebase.find({}, { _id: 0, __v: 0 }); // find all documents without showng the id or veersion-key in the response
}

//--------------- inserting new launch----------------- //
// using mongoDB
async function saveLaunch(launch) {
  // checking for integrity as if the planet's name exists in the database
  const planet = await planets.findOne({
    keplerName: launch.target,
  }); // the filter says that the "launch.target" must be from the names of the planets (keplerName) from planets database
  if (!planet) {
    throw new Error(`No matching planet was found`);
  }

  await launchesDatebase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}
async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getlatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customer: ["ZTM", "NASA"],
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

function abortLaunchById(launchID) {
  const aborted = launches.get(launchID);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  // addNewLaunch,
  scheduleNewLaunch,
  abortLaunchById,
};
