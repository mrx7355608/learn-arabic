const express = require("express");
const lectureDataValidator = require("@middlewares/lectureDataValidator");
const LectureServices = require("./lectures.services");

const router = express.Router();
const services = new LectureServices();

// TODO: add lectures endpoint routes
router.get("/", async (req, res, next) => {
    const { results, data } = await services.fetchData();
    return res.status(200).json({ results, data });
});
router.post("/create", lectureDataValidator, async (req, res, next) => {
    const { newLecture } = await services.create(req.body);
    return res.status(201).json({ newLecture });
});

module.exports = router;
