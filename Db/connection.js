import mongoose from 'mongoose';

export const Connection = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/ToDoList').then(() => {
        console.log("Database is connected");
    })
};
