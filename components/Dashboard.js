const Dashboard = () => {
    const HTML_Component = document.createElement("div");
    // toggled buttons next to h2
    const markup = 
        `<div id="_dashboard" class="dashboard">
            <h2 data-toggle="collapse" href="#collapseDashboard" role="button" aria-expanded="true" aria-controls="collapseDashboard">
                Dashboard
            </h2>
            <div class="buttons">
                <button id="chart-age" type="button" class="btn btn-secondary">Age</button>
                <button id="chart-gender" type="button" class="btn btn-dark btn-secondary">Gender</button>
                <button id="chart-wage" type="button" class="btn btn-dark btn-secondary">Wages</button>
            </div>
            <div class="collapse show" id="collapseDashboard">
                <div id="chart"></div>
            </div>
        </div>`;

    
    HTML_Component.innerHTML = markup;
    return HTML_Component;
};


const PieChart = (title, values, labels) => {
    const data = [
        {
            values: values,
            labels: labels,
            type: "pie",
            marker: { colors: labels.map(v => randomColor()) }
        }
    ];
      
    const layout = {
        title: title,
        font: {color: "#FFF"},
        paper_bgcolor: "#444",
        plot_bgcolor: "#444"
    };

    Plotly.react("chart", data, layout);
}

const Histogram = (title, values) => {
    const data = [
        {
            x: values,
            type: "histogram",
            autobinx: false,
            nbinsx: 20,
            xbins: {
                start: Math.min(values), 
                end: Math.max(values)
            },
            marker: { color: randomColor() }
        }
    ];

    const layout = {
        title: title,
        font: {color: "#FFF"},
        paper_bgcolor: "#444",
        plot_bgcolor: "#444",
    };

    Plotly.react("chart", data, layout);
};

