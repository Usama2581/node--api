const express = require('express') 
const app = express()
const io = require('socket.io')
const db = require('./config/db')
const cors = require('cors')
const port = process.env.PORT || 4000;




app.use(cors())

app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})


db.connection
.once('open', () => console.log('connected to db'))
.on('err', (e) => console.log(e))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/', require('./route/root'))