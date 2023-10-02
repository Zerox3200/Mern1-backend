import Joi from "joi";
import { ErrorCatch } from "../utils/CatchError.js";
import { TaskModel } from "../Db/models/Tasks.js";

export const TaskValidation = ErrorCatch(async (req, res, next) => {
    const TaskSchema = Joi.object({
        Title: Joi.string().min(5).max(40).required(),
        Status: Joi.string().valid("Completed", "Active").required()
    }).required()
    const result = TaskSchema.validate(req.body);
    if (result.error) {
        return res.json({ Message: "We got a problem with inputs", result });
    }
    return next();
})

export const StatusVAlidation = ErrorCatch(async (req, res, next) => {
    const TaskSchema = Joi.object({
        Status: Joi.string().valid("Completed", "Active").required()
    }).required()
    const result = TaskSchema.validate(req.params);
    if (result.error) {
        return res.json({ Message: "We got a problem with inputs", result });
    }
    return next();
})