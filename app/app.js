//run app function when DOM is loaded
document.addEventListener("DOMContentLoaded", app);
//define global variables inside index.html
var main = document.querySelector("main");
var container = document.getElementById("container");
var form = document.getElementById("form");
var input = document.getElementById("username");
var ul = document.createElement("ul");
ul.className = "repo-list";
function app() {
    console.log("app is running..");
    eventListeners();
}
//setup events
function eventListeners() {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        searchRepos();
    });
}
function searchRepos() {
    var userName = input.value.trim();
    if (userName) {
        fetchData(userName);
    }
}
function fetchData(userName) {
    var url = "https://api.github.com/users/".concat(userName, "/repos");
    fetch(url)
        .then(function (response) {
        if (!response.ok) {
            throw new Error("HTTP Response Error: ".concat(response.status));
        }
        return response.json();
    })
        .then(function (data) {
        if (data.length === 0) {
            var noUserMessage = document.createElement("p");
            noUserMessage.textContent = "No repositories found.";
            container.appendChild(noUserMessage);
            return [];
        }
        var cleanedData = data.map(function (repo) {
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
        .then(function (cleanedData) {
        displayData(cleanedData);
    })
        .catch(function (error) {
        console.error("HTTP Response Error: ".concat(error.message));
        var errorMessage = document.createElement("p");
        errorMessage.textContent = "Error: ".concat(error.message);
        container.appendChild(errorMessage);
    });
}
function displayData(repos) {
    container.innerHTML = "";
    repos.forEach(function (repo) {
        var li = document.createElement("li");
        li.innerHTML = "\n    <div class=\"repos\">\n    <p>".concat(repo.name, "</p>\n    <a href=\"").concat(repo.url, "\" target=\"_blank\">").concat(repo.url, "</a>\n    <p>").concat(repo.description, "</p>\n   <img src=\"").concat(repo.avatar, "\" alt=\"avatar\" width=\"100\">\n    </div>\n    ");
        ul.appendChild(li);
    });
    container.appendChild(ul);
}
