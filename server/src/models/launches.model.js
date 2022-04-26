const launches = new Map();
// const launches = require("./launches.mongo");

let latestFlightNumber = 100;

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
launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
  console.log(launches);
  return launches.has(launchId); // true/false
}

// to make the model responsible of outputing clean and ready data
function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customer: ["ZTM", "NASA"],
      flightNumber: latestFlightNumber,
    })
  );
}

function abortLaunchById(launchID) {
  const aborted = launches.get(launchID);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};
