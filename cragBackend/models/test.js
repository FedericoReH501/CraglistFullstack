const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  routeName: { type: String, required: true },
  difficult: { type: String, required: true },
});

const sectorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  routes: [routeSchema],
});

const cragSchema = new mongoose.Schema({
  name: String,
  region: String,
  access: String,
  exposition: String,
  kind: String,
  parkingGps: { type: String, default: "diocan" },
  locationGps: String,
  sectors: [sectorSchema],
});

const Crag = mongoose.model("Crag", cragSchema);

module.exports = Crag;
