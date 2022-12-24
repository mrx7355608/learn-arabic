export default function buildMaterialEntity({ sanitizeHtml, ApiError }) {
    return function ({ topic, studyFrom }) {
        if (!topic) {
            throw new ApiError("Topic is required!", 400);
        }
        topic = sanitizeHtml(topic).trim();
        if (topic.length < 3) {
            throw new ApiError("Topic too short", 400);
        }

        if (!studyFrom) {
            throw new ApiError("Topic is required!", 400);
        }
        studyFrom = sanitizeHtml(studyFrom).trim();
        if (studyFrom.length < 3) {
            throw new ApiError("Study from too short", 400);
        }
    };
}
