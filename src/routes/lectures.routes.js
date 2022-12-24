import { Router } from "express";
import requestHandler from "../utils/makeRequestHandler.js";
import lectureControllers from "../controllers/lectures/index.js";

const lectureRouter = Router();
lectureRouter.get("/", requestHandler(lectureControllers.getLectures));

export default lectureRouter;
