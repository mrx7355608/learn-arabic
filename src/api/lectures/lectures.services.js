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
	
    async update(id, data) {
        await this.fetchById(id);
        const newData = await updateLecture(id, data);
        return { newData };
    }
	
    async updateMaterial(lectureId, materialId, data) {
        await this.fetchById(lectureId);
        const newData = await updateLectureMaterial(
            lectureId,
            materialId,
            data
        );
        return { newData };
    }

	async delete(id) {
		const result = await deleteLecture(id);
		return { result }
	}
}

module.exports = LectureServices;
