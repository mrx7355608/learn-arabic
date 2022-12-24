import buildLectureEntity from "./lecture.js";
import buildMaterialEntity from "./lecture-material.js";
import sanitizeHtml from "sanitize-html";
import ApiError from "../../utils/ApiError.js";

const arrayOfStrings = (array) => {
    array.every((elem) => typeof elem === "string");
};

const makeMaterial = buildMaterialEntity({ sanitizeHtml, ApiError });
const makeLecture = buildLectureEntity({
    arrayOfStrings,
    ApiError,
    makeMaterial,
    sanitizeHtml,
});
export default makeLecture;
