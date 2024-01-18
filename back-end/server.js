const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')

const routes = require('./routes.js')

const app = express()
app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'nflAPI',
    password: '123456789',
    database: 'nflplays' 
} 

// middlewares --------------
app.use(myconn(mysql, dbOptions, 'single'))
app.use('/api', routes)

// routes -------------------------
app.get('/', (req, res) =>{
    res.send('Welcome to my API')
})

// server runing --------------
app.listen(app.get('port'), ()=>{
    console.log('server listening on port ', app.get('port'))
})