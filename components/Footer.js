const Footer = (name, url) => {
    const HTML_Component = document.createElement("div");

    const markup = 
        `<footer id="_about">
            Elektroniczna Wymiana Danych, Projekt Egzaminacyjny
            &copy; 2020 <a href="${url}">${name}</a>
        </footer>`;

    HTML_Component.innerHTML = markup;
    return HTML_Component;
};