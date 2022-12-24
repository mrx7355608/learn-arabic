import makeLecture from "../../entities/lectures/index.js";

export default function buildAddLecture({ lecturesDb, ApiError }) {
    return async function (lectureInfo) {
        if (!lectureInfo) {
            throw new ApiError("Provide lecture info");
        }

        const lecture = makeLecture(lectureInfo);
        return await lecturesDb.insert({
            title: lecture.getTitle(),
            homework: lecture.getHomework(),
            summary: lecture.getSummary(),
            published: lecture.isPublished(),
            topics: lecture.getTopics(),
            keyPoints: lecture.getKeyPoints(),
            material: lecture.getMaterial(),
        });
    };
}
