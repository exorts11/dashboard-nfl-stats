Chart.defaults.color = '#fff'
Chart.defaults.borderColor = '#444'

const printCharts = (team = 'global') => {

    let scoredPointsChart = `http://127.0.0.1:9000/api/scoredPoints/${team}`
    let offensiveFormations = `http://127.0.0.1:9000/api/offensiveFormations/${team}`
    //console.log(team)
    fetchCoastersData(scoredPointsChart, offensiveFormations)
        .then(([values, valuesFormations]) => {
            //console.log(values)
            console.log(valuesFormations)
            renderAvgScoredPoint(values)
            renderFormationFrequency(valuesFormations)
            enableEventHandlers()
        })
    }

    
    //fetchCoastersData('http://127.0.0.1:9000/api/global')
    //    .then(([values]) => {
    //        renderAvgScoredPoint(values)
    //        renderModelsChart()
    //    })
    //        
    /*fetchCoastersData('https://coasters-api.herokuapp.com', 'https://coasters-api.herokuapp.com/country/Spain')
        .then(([allCoasters, nationalCoasters]) => {
            renderModelsChart(allCoasters)
            renderFeaturesChart(nationalCoasters)
            renderYearsChart(allCoasters)
            enableEventHandlers(nationalCoasters)
        })*/





const renderFormationFrequency = (valuesFormations) => {

    /*const uniqueModels = [...new Set(coasters.map(coaster => coaster.model))]*/
    //const formations = ['uno', 'dos', 'tres']
    let formations = []
    let frequency = []
    for (let i of valuesFormations){
        console.log(i)
        formations.push(i.offensiveFormation)
        frequency.push(i.frequency)
    }


    const data = {
        labels: formations,
        datasets: [{
            /*data: uniqueModels.map(currentModel => coasters.filter(coaster => coaster.model === currentModel).length),*/
            //data: [10,20,30],
            data: frequency,
            borderColor: getDataColors(),
            backgroundColor: getDataColors(20)
        }]
    }

    const options = {
        plugins: {
            legend: { position: 'left' }
        }
    }

    new Chart('formationFrequency', { type: 'doughnut', data, options })
}




/*const renderFeaturesChart = coasters => {

    const data = {
        labels: coasters.map(coaster => coaster.name),
        datasets: [{
            label: 'Altura (m)',
            data: coasters.map(coaster => coaster.height),
            borderColor: getDataColors()[0],
            backgroundColor: getDataColors(20)[0]
        }]
    }

    const options = {
        plugins: {
            legend: { display: false }
        },
        scales: {
            r: {
                ticks: { display: false }
            }
        }
    }

    new Chart('featuresChart', { type: 'radar', data, options })
}

*/



const renderAvgScoredPoint = (values) => {

    //console.log(values)
    const weeks = ['1','2','3','4','5','6','7', '8', '9']
    /*const datos = [1,2,3,4,5,6,7]*/

    let avg_score = []
    for (let i of values){
        avg_score.push(i.avg_score)
    }

    const data = {
        labels: weeks,
        datasets: [{
            /*data: getCoastersByYear(coasters, years),*/
            data: avg_score,
            tension: .5,
            borderColor: getDataColors()[1],
            backgroundColor: getDataColors(20)[1],
            fill: true,
            pointBorderWidth: 5
        }]
    }

    const options = {
        plugins: {
            legend: { display: false }
        }
    }

    new Chart('scoredPoints', { type: 'line', data, options })
}


printCharts()