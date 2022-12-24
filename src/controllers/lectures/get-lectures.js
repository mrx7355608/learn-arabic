export default function buildGetLectures({ listLectures }) {
    return async function (httpRequest) {
        try {
            const limit = httpRequest.query.limit;
            const page = httpRequest.query.page;
            const sortby = httpRequest.query.sort;

            const res = await listLectures({ limit, page, sortby });
            return {
                statusCode: 200,
                body: res,
            };
        } catch (err) {
            return {
                statusCode: 400,
                body: { error: err.message },
            };
        }
    };
}
