const Header = () => {
    const HTML_Component = document.createElement("div");
    
    const markup = 
        `<div class="header-tab">
            <h1>User Panel</h1>
            <nav>
                <ul>
                    <li><a href="#_dashbord">Dashboard</a></li>
                    <li><a href="#_info">User Info</a></li>
                    <li><a href="#_list">Users List</a></li>
                    <li><a href="#_about">About</a></li>
                    <li id="reload"><a href="#">&#x21bb;</a></li>
                </ul>
            </nav>
        </div>`;

    HTML_Component.innerHTML = markup;
    return HTML_Component;
};


