const LectureModel = require("./lectures.model");

exports.getLectures = async () => {
	// TODO: Add filtering, sorting and pagination
	const data = await LectureModel.find({})
	return data;
};

exports.getLectureById = async (id) => {
	const lecture = await LectureModel.findById(id);
	return lecture;
}

exports.getLecture = async (filter) => {
	// TODO: Validate filter object (middleware)
	const lecture = await LectureModel.findById(filter);
	return lecture;
}

exports.createLecture = async (lectureData) => {
	// TODO: Validate lectureData object (middleware)
	const newLecture = await LectureModel.create(lectureData);
	return newLecture;
};