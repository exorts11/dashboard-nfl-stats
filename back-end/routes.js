const express = require('express')
const routes = express.Router()


routes.get('/scoredPoints/:team', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        let team = [req.params.team]

        if (team == 'global'){
            conn.query(`SELECT week, (AVG(homeFinalScore) + AVG(visitorFinalScore))/2 as avg_score from games group by week;`, (err, rows)=>{
                if(err) return res.send(err)


                res.send(rows)
            })
        }else{
            conn.query(
                `SELECT week,
                    CASE
                        WHEN homeTeamAbbr = '${team}' THEN homeFinalScore
                        WHEN visitorTeamAbbr = '${team}' THEN visitorFinalScore
                    END AS avg_score
                FROM games
                WHERE homeTeamAbbr = '${team}' or visitorTeamAbbr = '${team}'
                GROUP BY week;`, (err, rows)=>{
                if(err) return res.send(err)


                res.send(rows)
            })
        }
    })
})

// offensive formations
routes.get('/offensiveFormations/:team', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) returnres.send(err)
        let team = [req.params.team]

        if (team == 'global'){
            conn.query('SELECT * FROM nflplays.frequency_formations_global;', (err, rows)=>{
                if(err) return res.send.send(err)

                res.send(rows)
            })
        }else{
            conn.query(
                `SELECT * 
                FROM nflplays.frequency_formations_by_team
                WHERE team='${team}';`, (err, rows)=>{
                    if(err) return res.send(err)

                    res.send(rows)
                }
            )
        }
    })
})

module.exports = routes