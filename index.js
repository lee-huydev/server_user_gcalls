const express = require('express')
const cors = require('cors')
const db = require('./config/db')
const app = express()
const port = process.env.PORT || 5000;
const routerUsers = require('./routes/user.router')
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
// Middleware router
app.use('/api/users', routerUsers)
// Connect db
db.connect()
//Listen
app.listen(port)