//// Module Imports
import colors from "colors"
import EventEmitter from "events"
const eventEmitter = new EventEmitter();

//// File Imports 
import { getPath as pathGetter, fsModules as fs , objectManager as objManager, Student, login, getFileType as gft} from './app.js';

//////// EXER 1 /////////

let createdUsers = [{ role: "admin", fullname: "John Doe", username: "qwerty", password: "123qwe" }, { role: "client", fullName: "Bob Bobski", username: "asdasd", password: "zxczxc" }];

login(createdUsers, "qwerty", "123qwe")
login(createdUsers, "qwerwty", "123qwe")
console.log(createdUsers)

///////// EXER 2 //////////

let fileName = 'homework.txt';
let dirPath = 'db';
let filePath = pathGetter(fileName, dirPath, "..");

await fs.write(filePath, 'Homework 02 in Basic Node');
await fs.append(filePath, '. FINISHED!');
let data = await fs.read(filePath, gft(filePath));
console.log(data)

////////// EXER 3 /////////

const newStudent = new Student("John Doe", "johndoe@example.com", "password123");

fileName = 'users.json';
filePath = pathGetter(fileName, dirPath, "..");

let studentsArray = await fs.read(filePath, gft(filePath));

objManager.deleteObject(studentsArray, "353505e7-94eb-4afa-8085-97e12d6766c1")
objManager.readObject(studentsArray, "3")
objManager.changeObject(studentsArray, 3, "done", true)

studentsArray.push(newStudent);

await fs.write(filePath, JSON.stringify(studentsArray, null, 2));









