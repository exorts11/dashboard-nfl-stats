const enableEventHandlers = () => {

    // scoredPoints graph
    document.querySelector('#featuresOptions').onchange = e => {

        const { value: team, text: label } = e.target.selectedOptions[0]
        const weeks = ['1','2','3','4','5','6','7', '8', '9']

        //console.log(team, label)

        //const newData = coasters.map(coaster => coaster[property])
        let scoredPointsChart = `http://127.0.0.1:9000/api/scoredPoints/${team}`
        fetchCoastersData(scoredPointsChart)
        .then(([newData]) => {

            let avg_score = []
            for (let i of newData){
                avg_score.push(i.avg_score)
            }

            //console.log(newData)
            updateChartData('scoredPoints', avg_score, weeks)
        })
    }
    
}