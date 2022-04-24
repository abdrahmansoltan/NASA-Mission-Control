const {planets} = require("../../models/planets.model");

function getAllPlanets(req, res) {
  return res.status(200).json(planets);
  // we use return to make sure that this function sets the response ONCE (to make sure that function stops executing when response is set).
}

module.exports = {
  getAllPlanets,
};
