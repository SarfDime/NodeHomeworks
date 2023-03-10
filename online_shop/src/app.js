import express from "express";
import router from "./routes.js";
import { getPath, fsModules as fs} from './dependencies.js'

const app = express()

const PORT = 3000

let logfileName = 'logs.txt';
let logfilePath = getPath(logfileName, "db", "..");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(async (req, res, next) => {
    await fs.append(logfilePath, "\nServer accessed at " + new Date());
    next();
})

app.use(router); 

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
})



