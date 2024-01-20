const express = require('express')
const routes = express.Router()


routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT week, (AVG(homeFinalScore) + AVG(visitorFinalScore))/2 as avg_score from games group by week;', (err, rows)=>{
            if(err) return res.send(err)
            
            
            res.send(rows)
        })
    })
})

module.exports = routes