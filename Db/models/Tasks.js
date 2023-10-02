import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
    Title: {
        type: String,
        unique: true
    }, Status: {
        type: String,
        enum: ["Completed", "Active"],
        default: "Active"
    }
})

export const TaskModel = model("ToDoList", TaskSchema)