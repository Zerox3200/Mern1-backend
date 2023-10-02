import { Router } from "express";
import { ErrorCatch } from "../utils/CatchError.js";
import { StatusVAlidation, TaskValidation } from "./task.validation.js";
import { TaskModel } from "../Db/models/Tasks.js";
import { AddTask, DeleteTask, EditStatus, EditTask, GetActive, GetAllTasks, GetCompleted, GlearAll } from "./task.route.js";

export const routing = Router();

routing.get("/GetTasks", GetAllTasks)

routing.post("/AddingTask", TaskValidation, AddTask);

routing.delete("/DeleteTask/:Title", DeleteTask);

routing.patch("/EditTask/:TitleFounder", EditTask);

routing.patch("/EditStatus/:Status", StatusVAlidation, EditStatus);

routing.patch("/EditStatus2/:Status", StatusVAlidation, async (req, res, next) => {
    const { Title } = req.body;
    const { Status } = req.params;
    const EditStatus = await TaskModel.findOneAndUpdate({ Title }, { Status }, { new: true })
    if (!EditStatus) {
        return res.json({ Message: "Can't update this title" })
    }
    return res.json({ GetAllTasks: EditStatus })
})

routing.get("/GetActive", GetActive);

routing.get("/CompletedActive", GetCompleted);

routing.delete("/DeleteAllCompleted", GlearAll);