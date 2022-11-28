const express = require('express') 
const app = express()
const io = require('socket.io')
const db = require('./config/db')
const cors = require('cors')

app.use(cors())

app.listen(3001, () => {
    console.log('Server is running at port 3001');
});


db.connection
.once('open', () => console.log('connected to db'))
.on('err', (e) => console.log(e))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/', require('./route/root'))