const enableEventHandlers = () => {

    document.querySelector('#featuresOptions').onchange = e => {

        const { value: team, text: label } = e.target.selectedOptions[0]
        const weeks = ['1','2','3','4','5','6','7', '8', '9']

        //console.log(team, label)

        //const newData = coasters.map(coaster => coaster[property])
        let url = `http://127.0.0.1:9000/api/${team}`
        fetchCoastersData(url)
        .then(([newData]) => {

            let avg_score = []
            for (let i of newData){
                avg_score.push(i.avg_score)
            }

            //console.log(newData)
            updateChartData('yearsChart', avg_score, weeks)
        })
    }

    
}