import http from 'http'

const defaultHtml = `<html><body><h1>Serve</h1></body></html>`

const studentHtml = `
<html>
  <body>
    <h1>You entered the student link</h1>
  </body>
</html>
`;

export const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(defaultHtml)
    } else if (req.url === '/student') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(studentHtml)
    } else {
        res.statusCode = 404
        res.end('404 Not Found')
    }
});