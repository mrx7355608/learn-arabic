const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    studyFrom: {
        type: String,
        required: true,
    },
});

const lectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    topics: {
        type: Array,
        min: 1,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    keyPoints: {
        type: Array,
        required: true,
        min: 1,
    },
    homework: {
        type: String,
        default: "No Homework given",
    },
    material: [materialSchema],
});

const LectureModel = mongoose.model("Lecture", lectureSchema);
module.exports = LectureModel;
