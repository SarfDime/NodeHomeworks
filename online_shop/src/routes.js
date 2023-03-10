import express, { response } from "express"
import { getPath, fsModules as fs, objectManager as objMngr, Product, getFileType as gft } from './dependencies.js'

const router = express.Router()

let dirPath = 'db'
let fileName = 'products.json'
let filePath = getPath(fileName, dirPath, "..")

// GET REQUESTS

router.get('/api/read', async (req, res) => {
    let data = await fs.read(filePath, gft(filePath))
    data.length === 0 ? (res.send('There are no products')) : res.send(data)
})

router.get('/api/read/:id', async (req, res) => {
    let data = await fs.read(filePath, gft(filePath))
    if(data.length === 0){
        res.send('There are no products')
        return
    }
    let obj = await objMngr.readObject(data, req.params.id);
    if (obj[0] === null) {
        res.send(obj[1])
        return
    }
    res.send(obj[0])
})

router.get('/api/buy', async (req, res) => {
    const cartPath = getPath('cart.json', dirPath, "..")
    const data = await fs.read(filePath, gft(filePath))
    if(data.length === 0){
        res.send('There are no products')
        return
    }
    let cartData = await fs.read(cartPath, gft(cartPath))
    if (cartData.length === 0) {
        res.send('Cart is empty')
        return
    }
    cartData.forEach(el => {
        const index = data.findIndex(e => e.id === el.id)
        if (index !== -1) {
            if (data[index].stock <= 1) {
                data[index].stock = null
                return
            }
            data[index].stock--
        }
    });
    res.send(cartData)
    await fs.write(filePath, JSON.stringify(data, null, 2))
    cartData = []
    await fs.write(cartPath, JSON.stringify(cartData, null, 2))
})

router.get('/api/cart/clear', async (req, res) => {
    const cartPath = getPath('cart.json', dirPath, "..")
    let cartData = await fs.read(cartPath, gft(cartPath))
    if (cartData.length === 0) {
        request.send('Cart already empty')
        return
    }
    cartData = []
    await fs.write(cartPath, JSON.stringify(cartData, null, 2))
    res.send('Cart cleared')
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
    if(data.length === 0){
        res.send('There are no products')
        return
    }
    const newProduct = new Product(req.body.name, req.body.price, req.body.description, req.body.stock)
    if (newProduct === undefined) {
        res.send('Please provide a new product properly')
        return
    }
    data.push(newProduct)
    await fs.write(filePath, JSON.stringify(data, null, 2))
    data = await fs.read(filePath, gft(filePath))
    res.send(data)
})

// {   Example for create
//     "name": "Created Product",
//     "price": 7850,
//     "description": "Created with api",
//     "stock": 52
// }   

router.post('/api/update/:id', async (req, res) => {
    const updateData = req.body
    let data = await fs.read(filePath, gft(filePath))
    if(data.length === 0){
        res.send('There are no products')
        return
    }
    const obj = await objMngr.changeObject(data, req.params.id, updateData.key, updateData.value)
    console.log(obj)
    if (obj[0] === null) {
        res.send(obj[1])
        return
    }
    if (obj[0] === undefined) {
        res.send(obj[1])
        return
    }
    await fs.write(filePath, JSON.stringify(data, null, 2))
    res.send(obj[0])
})

// {   Example for update
//     "key": "description",
//     "value": "I have been updated"
// }   

router.post('/api/add/:id', async (req, res) => {
    const cartPath = getPath('cart.json', dirPath, "..")
    let cartData = await fs.read(cartPath, gft(cartPath))
    const data = await fs.read(filePath, gft(filePath))
    if(data.length === 0){
        res.send('There are no products')
        return
    }
    let obj = data.find(e => e.id == req.params.id)
    if (obj === undefined) {
        res.send('Product not found')
        return
    }
    if (obj.stock === null) {
        res.send('Product is out of stock')
        return
    }
    if (cartData.some(e => e.id === obj.id)) {
        res.send('Product already in cart')
        return
    }
    cartData.push(obj)
    await fs.write(cartPath, JSON.stringify(cartData, null, 2))
    res.send(cartData)
})

router.post('/api/delete/:id', async (req, res) => {
    let data = await fs.read(filePath, gft(filePath))
    if(data.length === 0){
        res.send('There are no products')
        return
    }
    let obj = await objMngr.deleteObject(data, req.params.id)
    if (obj[0] === null) {
        res.send(obj[1])
        return
    }
    await fs.write(filePath, JSON.stringify(data, null, 2))
    data = await fs.read(filePath, gft(filePath))
    res.send(obj[0])
})

router.post('/api/cart/delete/:id', async (req, res) => {
    const cartPath = getPath('cart.json', dirPath, "..")
    let cartData = await fs.read(cartPath, gft(cartPath))
    if (cartData.length === 0) {
        request.send('Cart already empty')
        return
    }
    let obj = await objMngr.deleteObject(cartData, req.params.id)
    if (obj[0] === null) {
        res.send(obj[1])
        return
    }
    await fs.write(cartPath, JSON.stringify(data, null, 2))
    res.send(obj[0])
})

export default router

