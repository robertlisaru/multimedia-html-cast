import './index.css';

const elementFromHtml = (html) => {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
};

const displayChild = (child) => {
    return `
        <li class="child">
            ${child.name}
        </li>
        <li>${child.type === "directory" ? expandDirectory(child) : ""}</li>
    `;
};

const expandDirectory = (directory) => {
    return `
        <ul class="directory">
            ${directory.children.map(displayChild).join("")}
        </ul>    
    `;
};

const movieFolder = require('./movie-files.json');

const appTitle = movieFolder.name;
document.getElementById("title").textContent = appTitle;
document.getElementById("content").appendChild(elementFromHtml(expandDirectory(movieFolder)));
