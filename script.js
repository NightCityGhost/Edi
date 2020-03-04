// Global State
const state = {
    selectedUser: null,
    users: null,
    list_collapsed: true,
    filter: {name: null, asc: false}
};

// Renders
const Render = (data) => {

    const root = document.createElement("div");

    // Compose fragment from components
    const fragment = document.createDocumentFragment();
    // Pass data as props
    fragment.appendChild(Header());
    fragment.appendChild(Dashboard());
    fragment.appendChild(UserCard(state.selectedUser));
    fragment.appendChild(UsersList(data));
    fragment.appendChild(Footer("Joanna Aleksandra Saletnik", "https://github.com/NightCityGhost/Edi"));

    // swap loader with comps
    document.getElementById("loader").remove();
    root.appendChild(fragment);
    document.body.appendChild(root);
};

const RenderError = () => {
    const loader = document.getElementById("loader");
    loader.innerHTML = `Failed to load data ...</br>Try reloading the page please`;
    loader.classList.remove("loader");
};

// Charts
const loadGenderChart = (_users = null) => {
    const users = _users? _users: JSON.parse(localStorage.getItem("users"));
    const gender = genderReducer(users);

    PieChart("Gender Ratio", gender.values, gender.labels);
};

const loadAgeChart = (_users = null) => {
    const users = _users? _users: JSON.parse(localStorage.getItem("users"));
    const age = ageReducer(users);

    Histogram("Age Distribution", age);
};

const loadWageChart = (_users = null) => {
    const users = _users? _users: JSON.parse(localStorage.getItem("users"));
    const wages = wagesReducer(users);

    Histogram("Yearly Salary Distribution", wages);
};

// Listeners
const applyListeners = (users) => {
    // Chart Display
    document.getElementById("chart-gender").addEventListener("click", (e) => {
        toggleButton(e.target);
        loadGenderChart(users)
    });
    document.getElementById("chart-age").addEventListener("click", (e) => {
        toggleButton(e.target);
        loadAgeChart(users)
    });
    document.getElementById("chart-wage").addEventListener("click", (e) => {
        toggleButton(e.target);
        loadWageChart(users)
    });
    // Card Select User From List
    document.querySelector("tbody").addEventListener("click", (e) => {
        if(!e.target.parentElement.classList.contains("row-user")) return;

        const data = [...e.target.parentElement.children].map(child => child.innerText); 
        // 0:name 5:cell 6:wages quite unique to identify

        state.selectedUser = users.filter(user => 
            user.name===data[0] && user.cell===data[5] && user["Annual Wages"].toLocaleString()+" $"===data[6])[0];

        document.querySelector(".user-card").parentElement.innerHTML = UserCard(state.selectedUser).innerHTML;
    });
    // List Sort
    document.querySelectorAll("thead>tr>th").forEach(col => col.addEventListener("click", (e) => {
        document.querySelectorAll("thead>tr>th").forEach(c => {
            c.innerText = c.innerText.replace("▲","");
            c.innerText = c.innerText.replace("▼","");
            c.classList.remove("selected");
        });
        
        state.filter.name = col.innerText;
        col.classList.toggle("selected", state.filter.name===col.innerText);
        
        state.filter.asc = !state.filter.asc;
        col.innerText = col.innerText + (state.filter.asc? "▲" : "▼");

        sortUsers(users, state.filter.name, state.filter.asc);
    }));
    // List Collapse
    document.querySelector(".users-list-header").addEventListener("click", () => {
        state.list_collapsed = !state.list_collapsed;
        document.querySelector(".list-state").innerText = state.list_collapsed? "▲" : "▼";
    });
    // Reload
    document.getElementById("reload").addEventListener("click", () => location.reload());
};

// Fetch data and feed the components
document.addEventListener("DOMContentLoaded", () => {
    fetch("https://randomuser.me/api/?results=150")
        .then(res => res.json())
        .then(json => json.results)
        .then(users => {
            const reducedUsers = userReducer(users);
            localStorage.setItem("users", JSON.stringify(reducedUsers));
            state.users = reducedUsers;
            return reducedUsers
        })
        .then(users => {
            Render(users);
            return users;
        })
        .then(users => {
            // Instantiate Plotly chart.
            Plotly.newPlot("chart", null, {title: "Blank Chart"});
            loadAgeChart(users);
            return users;
        })
        .then(users => applyListeners(users))
        .catch(err => {
            console.error(err);
            RenderError();
        });
    
    // // Mock Render
    // const users = JSON.parse(localStorage.getItem("users"));
    // Render(users);
});

