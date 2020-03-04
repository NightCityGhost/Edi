const UserCard = (user = null) => {
    const HTML_Component = document.createElement("div");

    user = user? user : JSON.parse(localStorage.getItem("users"))[0];
    const {name, image, gender, country, email, age, cell} = user;

    fetchFlag(country);
    setTimeout(() => {
        const div = document.getElementById("box-plot");
        div.innerHTML = "";
        div.classList.add("fadee");
        BoxPlot(`${name}'s Salary Comparison`, user);
    }, 2500);

    const markup = 
        `<div id="_info" class="user-card">
            <span data-toggle="collapse" href="#collapseCard" role="button" aria-expanded="true" aria-controls="collapseCard">
                <h2>${name}</h2>
            </span>
            <div class="user collapse show" id="collapseCard">
                <img class="photo" src="${image}" alt="${name} Photo">
                <div class="user-info">    
                    <span>${gender==="Male"?"♂️":"♀️"} ${gender}</span>
                    <span><span class="flag">🏳️</span> ${country}</span>
                    <span>✉️ ${email}</span>
                    <span>🎂 ${age}</span>
                    <span>📞 ${cell}</span>
                </div>
                <div id="box-plot">
                    <div class="spinner-grow text-info" role="status" style="width: 3rem; height: 3rem; margin-top: 35px;">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>`;

    HTML_Component.innerHTML = markup;
    return HTML_Component;
};

const BoxPlot = (title, user) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const wages = wagesReducer(users);
    const user_salary = user["Annual Wages"];

    const data = [{
        x: wages,
        type: "box"
    }];

    const layout = {
        title: title,
        font: {color: "#FFF"},
        paper_bgcolor: "#444",
        plot_bgcolor: "#444",
        autosize: false,
        width: 400,
        height: 125,
        marker: { color: "#0AA" },
        margin: {
            l: 0,
            r: 25,
            b: 25,
            t: 25,
            pad: 0
          },
        shapes: [{
            type: "line",
            x0: user_salary,
            y0: -0.3,
            x1: user_salary,
            y1: 0.3,
            // opacity: 0.80,
            line: {
                color: "#F00",
                width: 2
            }
        }],
        xaxis: {
            tickmode: "auto"
        }
    };

    Plotly.react("box-plot", data, layout);
};