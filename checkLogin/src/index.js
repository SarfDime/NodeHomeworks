import colors from "colors"
import http from "http"

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
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

login(createdUsers, "qwerty","123qwe")
login(createdUsers, "qwerwty","123qwe")
console.log(createdUsers)