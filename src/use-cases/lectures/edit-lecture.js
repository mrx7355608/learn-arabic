import makeLecture from "../../entities/lectures/index.js";

export default function buildEditLecture({ lecturesDb, ApiError }) {
    return async function ({ id, changes }) {
        if (!id) {
            throw new ApiError("Provide lecture id", 400);
        }

        const existingLecture = await lecturesDb.findById({ id });
        if (!existingLecture) {
            throw new ApiError("Lecture not found", 404);
        }

        const lecture = makeLecture({ ...existingLecture, ...changes });
        return await lecturesDb.update({
            id,
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
