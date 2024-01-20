const fetchCoastersData = (...urls) => {
    /*const promises = urls.map(url => fetch(url).then(response => response.json()))
    */
    /*const url = urls[0]
    console.log(url)*/

    const values = urls.map(url =>
        fetch(url, {
            method: 'GET',
            headers: { 'Content-type': 'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                let week = []
                for (let i of data){
                    week.push(i.avg_score)
                }
                return week
            })
    )
    
    /*
    console.log(values)
    */
    /* const values = [[1,2,3,4,5,6,7,8,9]] */
    return Promise.all(values)
}

const getDataColors = opacity => {
    const colors = ['#7448c2', '#21c0d7', '#d99e2b', '#cd3a81', '#9c99cc', '#e14eca', '#ffffff', '#ff0000', '#d6ff00', '#0038ff']
    return colors.map(color => opacity ? `${color + opacity}` : color)
}

const getCoastersByYear = (coasters, years) => {
    const coastersByYear = years.map(yearsRange => {
        const [from, to] = yearsRange.split('-')
        return coasters.filter(eachCoaster => eachCoaster.year >= from && eachCoaster.year <= to).length
    })
    return coastersByYear
}

const updateChartData = (chartId, data, label) => {
    const chart = Chart.getChart(chartId)
    chart.data.datasets[0].data = data
    chart.data.datasets[0].label = label
    chart.update()
}