const LectureModel = require("./lectures.model");

exports.getLectures = async () => {
    // TODO: Add filtering, sorting and pagination
    const data = await LectureModel.find({});
    return data;
};

exports.getLectureById = async (id) => {
    const lecture = await LectureModel.findById(id);
    return lecture;
};

exports.getLecture = async (filter) => {
    // TODO: Validate filter object (middleware)
    const lecture = await LectureModel.findById(filter);
    return lecture;
};

exports.createLecture = async (lectureData) => {
    // TODO: Validate lectureData object (middleware)
    const newLecture = await LectureModel.create(lectureData);
    return newLecture;
};

exports.updateLecture = async (id, data) => {
    const updatedLectureData = await LectureModel.findByIdAndUpdate(id, data, {
        new: true,
    });
    return updatedLectureData;
};

exports.updateLectureMaterial = async (lectureId, materialId, data) => {
    const newData = await LectureModel.findOneAndUpdate(
        { _id: lectureId, "material._id": materialId },
        {
            $set: {
                "material.$": data,
            },
        },
        {
            new: true,
        }
    );
    return newData;
};
