const { getAllPlanets } = require("../../models/planets.model");

async function httpgetAllPlanets(req, res) {
  return res.status(200).json(await getAllPlanets());
  // we use return to make sure that this function sets the response ONCE (to make sure that function stops executing when response is set).
}

module.exports = {
  httpgetAllPlanets,
};
