const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const fileUpload = require('express-fileupload')
const authRouter = require('./routes/auth.routes')
const fileRouter = require('./routes/file.routes')
const app = express()
const PORT = config.get('serverPort')
const cors = require('cors')

app.use(fileUpload({}))
app.use(express.json())
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    }),
);
app.use('/api', authRouter)
app.use('/api/files', fileRouter)

const start = async () => {
    try {
        mongoose.connect(config.get('dbUrl'))

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch(e) {

    }
}

start()