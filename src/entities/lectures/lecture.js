export default function buildLectureEntity({
    arrayOfStrings,
    ApiError,
    sanitizeHtml,
    makeMaterial,
}) {
    return function ({
        title,
        topics,
        summary,
        published,
        keyPoints,
        homework,
        material,
    } = {}) {
        // Title
        if (!title) {
            throw new ApiError("Title is required!", 400);
        }
        title = sanitizeHtml(title).trim();
        if (title.length < 5) {
            throw new ApiError("Title is too short.", 400);
        }
        // Homework
        if (!homework) {
            homework = "No homework given";
        }
        homework = sanitizeHtml(homework).trim();
        if (homework.length < 5) {
            throw new ApiError("Homework is too short.", 400);
        }

        // Summary
        if (!summary) {
            throw new ApiError("Summary is required!", 400);
        }
        summary = sanitizeHtml(summary).trim();
        if (summary.length < 10) {
            throw new ApiError(
                "Sumamry is too short. Should be 10 characters long at least",
                400
            );
        }

        // Topics
        if (!topics) {
            throw new ApiError("Topics are required!", 400);
        }

        topics = topics.map((topic) => sanitizeHtml(topic).trim());
        topics = topics.filter((topic) => topic !== "");
        if (topics.length < 1) {
            throw new ApiError("Add at least one topic", 400);
        }
        if (!arrayOfStrings(topics)) {
            throw new ApiError("Topics contain an invalid value", 400);
        }

        // Keypoints
        if (!keyPoints) {
            throw new ApiError("Key points are required!", 400);
        }
        keyPoints = keyPoints.map((point) => sanitizeHtml(point).trim());
        keyPoints = keyPoints.filter((point) => point !== "");
        if (keyPoints.length < 1) {
            throw new ApiError("Add at least one point", 400);
        }
        if (!arrayOfStrings(keyPoints)) {
            throw new ApiError(
                "Lecture key points contain an invalid value",
                400
            );
        }

        material = material.map((m) => makeMaterial(m));

        return {
            getTitle: () => title,
            getSummary: () => summary,
            getHomework: () => homework,
            getTopics: () => topics,
            getKeyPoints: () => keyPoints,
            isPublished: () => published,
            getMaterial: () => material,
            publish: () => {
                published = true;
            },
            unPublish: () => {
                published = false;
            },
        };
    };
}
