Chart.defaults.color = '#fff'
Chart.defaults.borderColor = '#444'

const printCharts = () => {

    fetchCoastersData('http://127.0.0.1:9000/api')
        .then(([values]) => {
            renderAvgScoredPoint(values)
            renderModelsChart()
        })
            
    /*fetchCoastersData('https://coasters-api.herokuapp.com', 'https://coasters-api.herokuapp.com/country/Spain')
        .then(([allCoasters, nationalCoasters]) => {
            renderModelsChart(allCoasters)
            renderFeaturesChart(nationalCoasters)
            renderYearsChart(allCoasters)
            enableEventHandlers(nationalCoasters)
        })*/

}



const renderModelsChart = () => {

    /*const uniqueModels = [...new Set(coasters.map(coaster => coaster.model))]*/
    const uniqueModels = ['uno', 'dos', 'tres']

    const data = {
        labels: uniqueModels,
        datasets: [{
            /*data: uniqueModels.map(currentModel => coasters.filter(coaster => coaster.model === currentModel).length),*/
            data: [10,20,30],
            borderColor: getDataColors(),
            backgroundColor: getDataColors(20)
        }]
    }

    const options = {
        plugins: {
            legend: { position: 'left' }
        }
    }

    new Chart('modelsChart', { type: 'doughnut', data, options })
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

    const weeks = ['1','2','3','4','5','6','7', '8', '9']
    /*const datos = [1,2,3,4,5,6,7]*/
    const data = {
        labels: weeks,
        datasets: [{
            /*data: getCoastersByYear(coasters, years),*/
            data: values,
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

    new Chart('yearsChart', { type: 'line', data, options })
}


printCharts()