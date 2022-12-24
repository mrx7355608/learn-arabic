export default function buildListLectures({ lecturesDb }) {
    return async function ({ limit, page, sortby }) {
        // Default values
        const DEFAULT_LIMIT = 10;
        const DEFAULT_PAGE = 1;
        const DEFAULT_SORTBY = { createdAt: 1 };

        limit = limit * 1 || DEFAULT_LIMIT;
        page = page * 1 || DEFAULT_PAGE;
        const skip = page * limit - limit;
        if (!sortby || sortby !== "old") sortby = DEFAULT_SORTBY;
        if (sortby === "old") sortby = { createdAt: -1 };

        return await lecturesDb.findAll({ skip, limit, sortby });
    };
}
