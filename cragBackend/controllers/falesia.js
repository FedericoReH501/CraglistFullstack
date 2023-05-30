const falesiaRouter = require("express").Router();
const axios = require("axios");
const { request, response } = require("express");
const Crag = require("../models/crag");
const allRegions = [16];

let array = [];

const fetcher = async (link) => {
  for (let index = 0; index < allRegions.length; index++) {
    const element = allRegions[index];
    const result = await axios.get(`${link}${element}`);
    array.push(result.data);
  }
  return array;
};

const cragsFetcher = async (link) => {
  const result = await axios.get(`${link}/#fal_info`);
  return result.data;
};

const mongoUploader = async (craglist) => {
  for (let index = 0; index < craglist.length; index++) {
    const body = craglist[index];
    const crag = new Crag({
      name: body.name,
      region: body.region,
      sectors: body.sectors,
      access: body.access,
      exposition: body.exposition,
      kind: body.kind,
      parkingGps: body.parkingGps,
      locationGps: body.locationGps,
    });
    await crag.save();
  }
  return { saved: "saved" };
};

falesiaRouter.get("/", async (request, response) => {
  const result = await fetcher("https://www.falesia.it/section/");
  response.status(200).send(result);
  array = [];
});

falesiaRouter.post("/createDb", async (request, response) => {
  const cragList = request.body.cragList;
  result = await mongoUploader(cragList);
  response.status(201).json(result);
});

falesiaRouter.put("/", async (request, response) => {
  const link = request.body.link;
  const result = await cragsFetcher(link);
  console.log("passed here");
  response.status(200).send(result);
});

module.exports = falesiaRouter;
