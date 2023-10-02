import express from 'express';
import { Connection } from './Db/connection.js';
import { routing } from './src/task.controller.js';
import cors from 'cors';

const app = express()
const port = 3000
app.use(express.json());
app.use(cors())

app.use(routing);

Connection()


app.listen(port, () => console.log(`Example app listening on port ${port}!`));