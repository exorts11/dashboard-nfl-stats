const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const cors = require('cors');
const routes = require('./routes.js');
const app = express();

const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "http://127.0.0.1:5500", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }
    }
}

app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'nflAPI',
    password: '123456789',
    database: 'nflplays' 
};

// middlewares --------------
app.use(cors(
    config.application.cors.server
  ));
app.use(myconn(mysql, dbOptions, 'single'));
app.use('/api', routes);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
// routes -------------------------
app.get('/', (req, res) =>{
    res.send('Welcome to my API');
})

// server runing --------------
app.listen(app.get('port'), ()=>{
    console.log('server listening on port ', app.get('port'))
})

