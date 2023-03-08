import colors from "colors"
import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.get('/api/createdUsers', (req, res) => {
    res.send(createdUsers);
})

app.post('/api/createdUsers', (req, res) => {
    createdUsers.push(req.body)
    res.send(createdUsers);
})

app.get('/', (req, res) => {
    res.sendStatus(404);
})

app.post('/', (req, res) => {
    res.sendStatus(200);
})

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});

let createdUsers = [{ role: "admin", fullname: "John Doe", username: "qwerty", password: "123qwe" }, { role: "client", fullName: "Bob Bobski", username: "asdasd", password: "zxczxc" }];

function createUsers(role, fname, usname, pass) {
    createdUsers.push({ role: role, fname: fname, usname: us });
}

function login(array, usname, pass) {
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

login(createdUsers, "qwerty", "123qwe")
login(createdUsers, "qwerwty", "123qwe")
console.log(createdUsers)