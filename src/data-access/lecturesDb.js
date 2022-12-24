import LectureModel from "../entities/lectures/lectures.model.js";

export default function buildLecturesDb() {
    return {
        findAll,
        findById,
        findOne,
        insert,
        update,
        remove,
    };

    async function findAll({ limit, skip, sortby }) {
        const res = await LectureModel.find()
            .skip(skip)
            .limit(limit)
            .sort(sortby);
        return res;
    }
    async function findById({ id }) {
        return await LectureModel.findById(id);
    }
    async function findOne() {}
    async function insert() {}
    async function update({ id, changes }) {}
    async function remove({ id }) {}
}
