years = []
temps = []

dataSets = []

months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

async function getData() {
    const response = await           
    fetch("graph.csv");
    const data = await response.text();
    const rows = data.split("\n").slice(2);
    rows.forEach((elem) => {
            
            const row = elem.split(",");
            const yearSplit = row[0].split(".")
            if (years[yearSplit[0]] == undefined) {
            years[yearSplit[0]] = []
            }
            years[yearSplit[0]].push(row[1])
    });
    for (const [key, value] of Object.entries(years)) {
        col1 = (key-1880)/(2024-1880)*255
        console.log(col1)
        dataSets.push(
            {
                label: key,
                data: value,
                borderWidth: 2,
                borderColor: `rgba(${col1}, 0, ${255-col1}, 0.1)`,
            }
        )
    }
    console.log(years)
    makeGraph()
}

async function makeGraph() {
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'line',
        data: {
        labels: months,
        datasets: dataSets
        },
        options: {
        
        scales: {
            y: {
            beginAtZero: true
            }
        },
        plugins: {
            title: {
                font: {
                    size: 20
                },
                display: true,
                text: "GISTEMP Seasonal Cycle since 1880"
            },
            legend: {
                display: false
            },
        }
        }
    });
}

getData()
