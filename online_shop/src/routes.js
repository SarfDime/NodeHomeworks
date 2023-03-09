import express, { response } from "express"
import { getPath, fsModules as fs, objectManager as objMngr, Product, getFileType as gft } from './dependencies.js'

const router = express.Router()

let dirPath = 'db'
let fileName = 'products.json'
let filePath = getPath(fileName, dirPath, "..")

// GET REQUESTS

router.get('/api/read', async (req, res) => {
    let data = await fs.read(filePath, gft(filePath))
    res.send(data)
})

router.get('/api/read/:id', async (req, res) => {
    let data = await fs.read(filePath, gft(filePath))
    let obj = data.find(e => e.id == req.params.id);
    res.send(obj)
})

router.get('/api/buy', async (req, res) => {
    const cartPath = getPath('cart.json', dirPath, "..")
    const data = await fs.read(filePath, gft(filePath))
    let cartData = await fs.read(cartPath, gft(cartPath))
    cartData.forEach(el => {
        const index = data.findIndex(e => e.id === el.id)
        if (index !== -1) {
            if (data[index].stock <= 1) {
                data[index].stock = null
            }
            data[index].stock--
        }
    });
    await fs.write(filePath, JSON.stringify(data, null, 2))
    cartData = []
    await fs.write(cartPath, JSON.stringify(cartData, null, 2))
    res.send(cartData)
})

router.get('/', (req, res) => {
    res.sendStatus(200)
})

router.get("*", (req, res) => {
    res.redirect("/")
})

// POST REQUESTS

router.post('/api/create', async (req, res) => {
    let data = await fs.read(filePath, gft(filePath))
    data.push(req.body)
    await fs.write(filePath, JSON.stringify(data, null, 2))
    data = await fs.read(filePath, gft(filePath))
    res.send(data)
})

router.post('/api/update/:id', async (req, res) => {
    const updateData = req.body
    let data = await fs.read(filePath, gft(filePath))
    objMngr.changeObject(data, req.params.id, updateData.key, updateData.value)
    await fs.write(filePath, JSON.stringify(data, null, 2))
    data = await fs.read(filePath, gft(filePath))
    res.send(data)
})

/*
    {
        "key": "description",
        "value": "I have been updated"
    }  Example  for update
*/

router.post('/api/add/:id', async (req, res) => {
    console.log("dime")
    const cartPath = getPath('cart.json', dirPath, "..")
    let cartData = await fs.read(cartPath, gft(cartPath))
    const data = await fs.read(filePath, gft(filePath))
    let obj = data.find(e => e.id == req.params.id);
    cartData.push(obj)
    await fs.write(cartPath, JSON.stringify(cartData, null, 2))
    res.send(cartData)
})

router.post('/api/delete/:id', async (req, res) => {
    let data = await fs.read(filePath, gft(filePath))
    objMngr.deleteObject(data, req.params.id)
    await fs.write(filePath, JSON.stringify(data, null, 2))
    data = await fs.read(filePath, gft(filePath))
    res.send(data)
})

export default router

