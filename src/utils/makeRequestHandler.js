export default function requestHandler(controller) {
    return async (req, res) => {
        const httpRequest = {
            body: req.body,
            params: req.params,
            query: req.query,
        };
        controller(httpRequest)
            .then((resp) => {
                res.status(resp.statusCode).json(resp.body);
            })
            .catch(() => {
                res.status(500).json({ error: "An unknown error occured" });
            });
    };
}
