export default function buildRemoveLecture({ lecturesDb, ApiError }) {
    return async function ({ id }) {
        if (!id) {
            throw new ApiError("Provide lecture id", 400);
        }

        const existingLecture = await lecturesDb.findById({ id });
        if (!existingLecture) {
            throw new ApiError("Lecture not found", 400);
        }

        await lecturesDb.remove({ id });
        return {
            deletedDocumentCount: 1,
            message: "Lecture has been deleted",
        };
    };
}
