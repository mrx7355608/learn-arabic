class ReqQueryHandler {
    constructor(query) {
        this.query = query;
        this.DEFAULT_PAGE = 1;
        this.DEFAULT_SORT = "new";
        this.DEFAULT_LIMIT = 10;
    }

    // Filter un-wanted field
    filter() {
        const queryObj = { ...this.query };
        const allowedFields = ["page", "sort", "limit", "title", "topics"];
        Object.keys(queryObj).forEach((key) => {
            if (!allowedFields.includes(key)) delete this.query[key];
        });
        return this;
    }

    // Populate query object with either default or given values
    populate() {
        const myQuery = this.query;

        // Sorting
        if (!myQuery.sort || myQuery.sort !== "old") {
            myQuery.sort = this.DEFAULT_SORT;
        }

        if (myQuery.topics && myQuery.topics.includes(",")) {
            myQuery.topics = myQuery.topics.split(",");
        } else if (myQuery.topics) {
            myQuery.topics = [myQuery.topics];
        }

        myQuery.page = myQuery.page * 1 || this.DEFAULT_PAGE;
        myQuery.limit = myQuery.limit * 1 || this.DEFAULT_LIMIT;

        return this;
    }

    getData() {
        const { page, limit, sort, title, topics } = this.query;

        // Skip documents
        const skipDocs = page * limit - limit;

        // Sorting
        const sortBy = sort === "new" ? { createdAt: -1 } : { createdAt: 1 };

        // Filter object
        const filter = {};
        if (title) filter.title = title;
        if (topics) filter.topics = topics;

        return {
            filter,
            sortBy,
            skipDocs,
            limit,
        };
    }
}

module.exports = ReqQueryHandler;
