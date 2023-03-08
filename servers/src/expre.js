import express from "express";
export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log("Server accessed at " + new Date())
    next();
})

app.get('/api/createdUsers', (req, res) => {
    res.send(createdUsers)
})

app.post('/api/createdUsers', (req, res) => {
    createdUsers.push(req.body)
    res.send(createdUsers);
})

app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.post('/', (req, res) => {
    res.sendStatus(200);
})

app.get("*", (req, res) => {
    res.status(404).send({err_message: "NOT FOUND"})
})

let createdUsers = [{ role: "admin", fullname: "John Doe", username: "qwerty", password: "123qwe" }, { role: "client", fullName: "Bob Bobski", username: "asdasd", password: "zxczxc" }];