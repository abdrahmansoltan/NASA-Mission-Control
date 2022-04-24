const launches = new Map();

const launch = {
  flightNumber: 211,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchData: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// we use flightNumber as a key as it's Unique
launches.set(launch.flightNumber, launch);

module.exports = {
  launches,
};
