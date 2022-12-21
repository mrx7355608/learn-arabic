const express = require("express");
const asyncErrorHandler = require("express-async-handler");
const lectureDataValidator = require("@middlewares/lectureDataValidator");
const LectureServices = require("./lectures.services");

const router = express.Router();
const services = new LectureServices();

// Get all lectures
router.get(
    "/",
    asyncErrorHandler(async (req, res, next) => {
        const { results, data } = await services.fetchData(req.query);
        return res.status(200).json({ results, data });
    })
);

// Get one lecture with id
router.get(
    "/:id",
    asyncErrorHandler(async (req, res, next) => {
        const { lecture } = await services.fetchById(req.params.id);
        return res.status(200).json({ lecture });
    })
);

// Create lecture
router.post(
    "/create",
    lectureDataValidator,
    asyncErrorHandler(async (req, res, next) => {
        const { newLecture } = await services.create(req.body);
        return res.status(201).json({ newLecture });
    })
);

// Update lecture
// TODO: Validate data
router.patch(
    "/update/:id",
    asyncErrorHandler(async (req, res, next) => {
        const { newData } = await services.update(req.params.id, req.body);
        return res.status(200).json({ updated: newData });
    })
);

// Update class material
router.patch(
    "/update/:id/materials/:materialId",
    asyncErrorHandler(async (req, res, next) => {
        const lectureId = req.params.id;
        const materialId = req.params.materialId;
        const data = req.body;
        const { newData } = await services.updateMaterial(
            lectureId,
            materialId,
            data
        );
        return res.status(200).json({ updated: newData });
    })
);

// Delete lecture
router.delete(
    "/delete/:id",
    asyncErrorHandler(async (req, res, next) => {
        const { result } = await services.delete(req.params.id);
        return res.status(204).json({ result });
    })
);

module.exports = router;
