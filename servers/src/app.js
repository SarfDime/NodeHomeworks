import dotenv from "dotenv"

import { app } from "./expre.js"
import { server } from "./https.js"

if (process.env.NODE_ENV === 'test') {
    dotenv.config()
}

export const IP = '127.0.0.1'
const PORT = process.env.PORT || 3000

if (PORT !== 3000) {
    app.listen(PORT, IP, () => {
        console.log(`Server running at http://${IP}:${PORT}/`)
    });
} else {
    server.listen(PORT, IP, () => {
        console.log(`Server running at http://${IP}:${PORT}/`)
    });
}


