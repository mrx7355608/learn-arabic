import buildListLectures from "./list-lectures.js";
import buildAddLecture from "./add-lecture.js";
import buildEditLecture from "./edit-lecture.js";
import buildRemoveLecture from "./remove-lecture.js";
import ApiError from "../../utils/ApiError.js";
import buildLecturesDb from "../../data-access/lecturesDb.js";

const lecturesDb = buildLecturesDb();
const listLectures = buildListLectures({ lecturesDb });
const addLecture = buildAddLecture({ lecturesDb, ApiError });
const editLectures = buildEditLecture({ lecturesDb, ApiError });
const removeLectures = buildRemoveLecture({ lecturesDb, ApiError });

const lectureServices = Object.freeze({
    listLectures,
    addLecture,
    editLectures,
    removeLectures,
});

export default lectureServices;
export { listLectures, addLecture, editLectures, removeLectures };
