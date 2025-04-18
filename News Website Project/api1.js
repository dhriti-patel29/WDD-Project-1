const API_KEY = "dc77d3eedfc544d7b1ccb73400898fb0";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const template = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage || !article.title || !article.description) return;

        const cardClone = template.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const img = cardClone.querySelector("img");
    const title = cardClone.querySelector("#news-title");
    const source = cardClone.querySelector("#news-source");
    const desc = cardClone.querySelector("#news-desc");

    img.src = article.urlToImage;
    title.textContent = article.title;
    desc.textContent = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata"
    });

    source.textContent = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;

function onCategoryItemClick(id) {
    fetchNews(id);
    const category = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = category;
    curSelectedNav.classList.add("active");
}

const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-text");

searchBtn.addEventListener("click", () => {
    const query = searchInput.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
