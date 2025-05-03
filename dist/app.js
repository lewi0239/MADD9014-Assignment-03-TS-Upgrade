"use strict";
//run app function when DOM is loaded
document.addEventListener("DOMContentLoaded", app);
//define global variables inside index.html
const main = document.querySelector("main");
const container = document.getElementById("container");
const form = document.getElementById("form");
const input = document.getElementById("username");
const ul = document.createElement("ul");
ul.className = "repo-list";
function app() {
    console.log("app is running..");
    eventListeners();
}
//setup events
function eventListeners() {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        searchRepos();
    });
}
function searchRepos() {
    const userName = input.value.trim();
    if (userName) {
        fetchData(userName);
    }
}
function fetchData(userName) {
    const url = `https://api.github.com/users/${userName}/repos`;
    fetch(url)
        .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP Response Error: ${response.status}`);
        }
        return response.json();
    })
        .then((data) => {
        if (data.length === 0) {
            const noUserMessage = document.createElement("p");
            noUserMessage.textContent = `No repositories found.`;
            container.appendChild(noUserMessage);
            return [];
        }
        const cleanedData = data.map((repo) => {
            var _a;
            return ({
                name: repo.name,
                url: repo.html_url,
                description: repo.description || "No description",
                avatar: ((_a = repo.owner) === null || _a === void 0 ? void 0 : _a.avatar_url) || "fallback-avatar.png",
            });
        });
        return cleanedData;
    })
        .then((cleanedData) => {
        displayData(cleanedData);
    })
        .catch((error) => {
        console.error(`HTTP Response Error: ${error.message}`);
        const errorMessage = document.createElement("p");
        errorMessage.textContent = `Error: ${error.message}`;
        container.appendChild(errorMessage);
    });
}
//For the original assignment we had the option todo innerhtml or textcontent
function displayData(repos) {
    container.innerHTML = "";
    repos.forEach((repo) => {
        const li = document.createElement("li");
        li.innerHTML = `
    <div class="repos">
    <p>${repo.name}</p>
    <a href="${repo.url}" target="_blank">${repo.url}</a>
    <p>${repo.description}</p>
   <img src="${repo.avatar}" alt="avatar" width="100">
    </div>
    `;
        ul.appendChild(li);
    });
    container.appendChild(ul);
}
//# sourceMappingURL=app.js.map