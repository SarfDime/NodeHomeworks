import fsA from 'fs/promises';
import { fileURLToPath as fp } from 'url';
import path from 'path';
import { v4 as idV4 } from 'uuid';

export function getFileType(filePath) {
    const type = filePath.slice(filePath.lastIndexOf('.'));
    return type
};

export function login(array, usname, pass) {
    let authorized = false;
    array.forEach(e => {
        if (e.username === usname && e.password === pass) {
            authorized = true
        }
    })
    if (authorized) {
        console.log("Log in Successful".rainbow.bold)
        return
    }
    console.log("Log in Failure".red.italic.bold)
}

export function getPath(fn, dp, dir) {
    const dbpath = path.resolve(path.dirname(fp(import.meta.url)), dir, dp);
    const tempFile = path.join(dbpath, fn);
    return tempFile
}

export const fsModules = {
    write: async (filePath, text) => {
        try {
            await fsA.writeFile(filePath, text);
            console.log('Data written to file successfully!');
        } catch (err) {
            console.error(err);
        }
    },

    read: async (filePath, fileType) => {
        try {
            const data = await fsA.readFile(filePath, 'utf8');
            if (fileType === ".json") {
                return JSON.parse(data);
            }
            return data
        } catch (err) {
            console.error(err);
        }
    },

    append: async (filePath, text) => {
        try {
            await fsA.appendFile(filePath, text);
            console.log('Data appended to file successfully!');
        } catch (err) {
            console.error(err);
        }
    },
};

export const objectManager = {
    deleteObject: (arr, ID) => {
        const index = arr.findIndex(e => e.id == ID);
        if (index !== -1) {
            arr.splice(index, 1);
            console.log(`Object with id ${ID} has been deleted.`);
        }else{
            console.log(`Object with id ${ID} doesn't exist.`);
        } 
    },
    readObject: (arr, ID) => {
        const obj = arr.find(e => e.id == ID);
        if (obj) {
            console.log(`Object with id ${ID} has: "${Object.values(obj)}".`);
        } else {
            console.log(`Object with id ${ID} does not exist.`);
        }
    },
    changeObject: (arr, ID, key, value) => {
        const obj = arr.find(e => e.id == ID);
        if (obj) {
            if(obj[key] === undefined) {
                console.log(`Object with id ${ID}, doesn't have this key`)
                return
            } 
            obj[key] = value;
            console.log(`The value for ${key} in the object with id ${ID} has been changed to ${value}`);
        } else{
            console.log(`Object with id ${ID} does not exist.`);
        }
    }
}

export class Student {
    constructor(fullname, password) {
        this.id = idV4();
        this.fullname = fullname;
        this.password = password;
        Student.greet(this);
    }

    static greet(student) {
        console.log(`Welcome ${student.fullname}!`);
    }
}





