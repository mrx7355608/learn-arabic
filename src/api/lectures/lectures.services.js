const {
    getLectures,
    getOneLecture,
    getLectureById,
    createLecture,
} = require("./lectures.data");

class LectureServices {
    async fetchData() {
        const data = await getLectures();
        const results = data.length;
        return { data, results };
    }

    async fetchById(id) {
        const lecture = await getLectureById(id);
        if (lecture == null) throw new ApiError("Lecture not found", 404);
        return { lecture };
    }

    async fetchOne(filter) {
        const lecture = await getOneLecture(filter);
        if (lecture == null) throw new ApiError("Lecture not found", 404);
        return { lecture };
    }
    async create(data) {
        const newLecture = await createLecture(data);
        return { newLecture };
    }
}

module.exports = LectureServices;
