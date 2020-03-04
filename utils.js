const capitalizeFirst = (name) => name.charAt(0).toUpperCase() + name.slice(1);

const generateWages = (mean) => {
    const randomValue = (_mean, std) => _mean + Math.round(Math.random() * std * 2 - std);

    const rich = Math.random() >= 0.95? 50000:0;
    const totalIncome = randomValue(mean, 30000) + rich; //mean ~60 000

    const wages = {
        annual: totalIncome,
        monthly: (totalIncome / 12).toFixed(2),
        last_month: ((totalIncome / 12) *(Math.random() * 0.4 + 0.8)).toFixed()
    };

    return wages;
};

const parseWages = (_users) => _users.map(user => ({...user, "Annual Wages": user["Annual Wages"].toLocaleString()+" $"}));

const randomColor = () => {
    let color = "#";
    for(let t = 0; t < 3; t++)
    {
        let c = Math.round(Math.random()*255).toString(16);
        if (c.length % 2)
            c = "0" + c;
        color += c;
    }
    return color;
};

const fetchFlag = (country) => {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then(resp => resp.json())
        .then(data => {
            const code = data[0].altSpellings[0];
            flag_src = `https://www.countryflags.io/${code}/shiny/24.png`;
            return flag_src;
        })
        .then(flag_src => {
            if(flag_src)
            document.querySelector(".flag").innerHTML = `<img class="flag" src="${flag_src}" alt="${country} Flag">`;
        })
        .catch(err => console.error(err));
};

const toggleButton = (target) => {
    document.querySelectorAll(".buttons>.btn").forEach(btn => btn.classList.add("btn-dark"));
    target.classList.toggle("btn-dark");
};
