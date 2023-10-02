import { TaskModel } from "../Db/models/Tasks.js";
import { ErrorCatch } from "../utils/CatchError.js";

export const AddTask = ErrorCatch(async (req, res, next) => {
    const { Title } = req.body;
    const CheckTitle = await TaskModel.findOne({ Title });
    if (CheckTitle) {
        return res.json({ Message: "You should not add the same title" })
    }
    const AddTask = await TaskModel.create({ Title });
    if (!AddTask) {
        return res.json({ Message: "We can't add this into database" })
    }
    return res.json({ Message: "Done", result: AddTask });
});

export const DeleteTask = ErrorCatch(async (req, res, next) => {
    const { Title } = req.params;
    const DeleteTask = await TaskModel.deleteOne({ Title });
    if (!DeleteTask) {
        return res.json({ Message: "Not exsit for delete it" });
    }
    return res.json({ Message: "Done" });
})

export const EditTask = ErrorCatch(async (req, res, next) => {
    const { Title } = req.body;
    const { TitleFounder } = req.params
    const EditTask = await TaskModel.findOneAndUpdate({ Title: TitleFounder }, { Title }, { new: true });
    if (!EditTask) {
        return res.json({ Message: "We can't update because that dose not exsit" });
    }
    return res.json({ Message: "Edit Done", result: EditTask })
})

export const GetAllTasks = ErrorCatch(async (req, res, next) => {
    const GetAllTasks = await TaskModel.find();
    if (!GetAllTasks) {
        return res.json({ Message: "Table is empty" })
    }
    return res.json({ GetAllTasks });
})

export const EditStatus = ErrorCatch(async (req, res, next) => {
    const { Status } = req.params;
    const { Title } = req.body;
    const task = await TaskModel.findOneAndUpdate({ Title }, { Status }, { new: true });
    if (!task) {
        return res.json({ Messsage: "We can't edit this element" })
    }
    return res.json({ result: task });
})

export const GetActive = ErrorCatch(async (req, res, next) => {
    const Active = await TaskModel.find({ Status: "Active" });
    if (!Active) {
        return res.json({ Message: "Something went wrong" });
    }
    return res.json({ GetAllTasks: Active })
})

export const GetCompleted = ErrorCatch(async (req, res, next) => {
    const Completed = await TaskModel.find({ Status: "Completed" })
    if (!Completed) {
        return res.json({ Message: "There's something went wrong" })
    }
    return res.json({ GetAllTasks: Completed });
})

export const GlearAll = ErrorCatch(async (req, res, next) => {
    const Completed = await TaskModel.find();
    for (let i = 0; i < Completed.length; i++) {
        if (Completed[i].Status === "Completed") {
            await TaskModel.findOneAndDelete({ Title: Completed[i].Title })
        }
    }
    const Updated = await TaskModel.find();
    return res.json({ GetAllTasks: Updated })
})