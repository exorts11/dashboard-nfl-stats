const enableEventHandlers = () => {

    document.querySelector('#featuresOptions').onchange = e => {

        const { value: team, text: label } = e.target.selectedOptions[0]
        const weeks = ['1','2','3','4','5','6','7', '8', '9']

        //console.log(team, label)

        //const newData = coasters.map(coaster => coaster[property])
        let scoredPointsChart = `http://127.0.0.1:9000/api/scoredPoints/${team}`
        let offensiveFormations = `http://127.0.0.1:9000/api/offensiveFormations/${team}`

        fetchCoastersData(scoredPointsChart, offensiveFormations)
        .then(([newScoredPointsChart, newOffensiveFormations]) => {

            // scoredPoints graph
            let avg_score = []
            for (let i of newScoredPointsChart){
                avg_score.push(i.avg_score)
            }


            // offensive formation graph
            let formations = []
            let frequency = []
            for (let i of newOffensiveFormations){
                //console.log(i)
                formations.push(i.offensiveFormation)
                frequency.push(i.frequency)
            }

            //console.log(newData)
            updateChartData('scoredPoints', avg_score, weeks)
            updateChartData('formationFrequency', frequency, formations)
        })
    }
    
}