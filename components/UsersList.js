const UsersList = (_users = null) => {
    const HTML_Component = document.createElement("div");
    
    const users = listReducer(_users);
    const markup = 
        `<div id="_list" class="users-list">
            <span data-toggle="collapse" href="#collapseTable" role="button" aria-expanded="false" aria-controls="collapseTable">
                <h2 class="users-list-header">Users <span class="list-state">▲</span></h2>
            </span>
            <div class="collapse" id="collapseTable">
                <table>
                    <thead>
                        <tr>
                            ${Object.keys(users[0]).map(key => `<th>${capitalizeFirst(key)}</th>`).join("")}
                        </tr>
                    </thead>
                    <tbody>
                        ${users.map(c => 
                            `<tr class="row-user">
                                ${Object.entries(c).map(entry => `<td>${entry[1]}</td>`).join("")}
                            </tr>`
                        ).join("")}
                    </tbody>
                </table>
            </div>
        </div>`;

    HTML_Component.innerHTML = markup;
    return HTML_Component;
}

const sortUsers = (_users, header, asc) => {
    const users = listReducer(_users, false);
    header = header==="Annual Wages"? header : header.toLowerCase();

    if(asc)
        users.sort((a, b) => (a[header] > b[header] ? 1 : -1));
    else
        users.sort((a, b) => (a[header] < b[header] ? 1 : -1));

    const parsed_users = parseWages(users);
    const sorted = parsed_users.map(c => 
        `<tr class="row-user">
            ${Object.entries(c).map(entry => `<td>${entry[1]}</td>`).join("")}
        </tr>`
    ).join("");

    document.querySelector("tbody").innerHTML = sorted;
};