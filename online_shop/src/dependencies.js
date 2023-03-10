import fsA from 'fs/promises';
import { fileURLToPath as fp } from 'url';
import path from 'path';
import { v4 as idV4 } from 'uuid';

export function getFileType(filePath) {
    const type = filePath.slice(filePath.lastIndexOf('.'));
    return type
};

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
    deleteObject: async (arr, ID) => {
        const index = await arr.findIndex(e => e.id == ID)
        if (index !== -1) {
            arr.splice(index, 1)
            return [`Object with id ${ID} has been deleted.`]
        } else {
            return [null, `Object with id ${ID} doesn't exist.`]
        }
    },
    readObject: async (arr, ID) => {
        const obj = await arr.find(e => e.id == ID);
        if (obj) {
            return [`Object with id ${ID} has: "${Object.values(obj)}".`]
        } else {
            return [null, `Object with id ${ID} does not exist.`]
        }
    },
    changeObject: async (arr, ID, key, value) => {
        const obj = await arr.find(e => e.id == ID);
        if (obj) {
            if (obj[key] === undefined) {
                return [undefined, `Object with id ${ID}, doesn't have this key`]
            }
            obj[key] = value;
            return [`The value for ${key} in the object with id ${ID} has been changed to ${value}`]
        } else {
            return [null, `Object with id ${ID} does not exist.`]
        }
    }
}

export class Product {
    constructor(fullname, price, description, stock) {
        this.fullname = fullname
        this.price = price
        this.description = description
        this.stock = stock
        this.id = idV4()
    }
}





