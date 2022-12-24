import buildGetLectures from "./get-lectures.js";
import { listLectures } from "../../use-cases/lectures/index.js";

const getLectures = buildGetLectures({ listLectures });

const lectureControllers = Object.freeze({
    getLectures,
});

export default lectureControllers;
export { getLectures };
