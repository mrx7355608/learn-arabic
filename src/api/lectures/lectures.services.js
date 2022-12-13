const {
    getLectures,
    getOneLecture,
    getLectureById,
    createLecture,
    updateLecture,
    updateLectureMaterial,
    deleteLecture,
} = require("./lectures.data");
const ApiError = require("@utils/ApiError");
const ReqQueryHandler = require("@utils/ReqQueryHandler");

class LectureServices {
    // get all lectures
    async fetchData(queryStringObj) {
        // Returns req.query object's data in desired format
        const queryHandler = new ReqQueryHandler(queryStringObj);
        const queryData = queryHandler.filter().populate().getData();

        const data = await getLectures(queryData);
        const results = data.length;
        return { data, results };
    }

    // get one lecture by id
    async fetchById(id) {
        const lecture = await getLectureById(id);
        if (lecture == null) throw new ApiError("Lecture not found", 404);
        return { lecture };
    }

    // get one lecture with a filter
    async fetchOne(filter) {
        const lecture = await getOneLecture(filter);
        if (lecture == null) throw new ApiError("Lecture not found", 404);
        return { lecture };
    }

    // create new lecture
    async create(data) {
        const newLecture = await createLecture(data);
        return { newLecture };
    }

    // Update
    async update(id, data) {
        await this.fetchById(id);
        const newData = await updateLecture(id, data);
        if (newData == null)
            throw new ApiError("Failed to update lecture.", 400);
        return { newData };
    }

    // Update lecture material
    async updateMaterial(lectureId, materialId, data) {
        await this.fetchById(lectureId);
        const newData = await updateLectureMaterial(
            lectureId,
            materialId,
            data
        );
        if (newData == null)
            throw new ApiError("Failed to update lecture", 400);
        return { newData };
    }

    // Delete lecture
    async delete(id) {
        await this.fetchById(id);
        const result = await deleteLecture(id);
        if (result == null)
            throw new ApiError("Failed to delete lecture.", 400);
        return { result };
    }
}

module.exports = LectureServices;
