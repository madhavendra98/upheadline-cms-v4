import { db } from "./firebase-config.js";
import {
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");

let allNews = [];

// News Load
onValue(ref(db, "news"), (snapshot) => {

    newsContainer.innerHTML = "";

    if (!snapshot.exists()) {
        newsContainer.innerHTML =
        "<h2>कोई समाचार उपलब्ध नहीं है।</h2>";
        return;
    }

    const data = snapshot.val();

    allNews = Object.entries(data).reverse();

    showNews(allNews);

});

// Show News Function
function showNews(newsArray){

    newsContainer.innerHTML = "";

    newsArray.forEach(([id, news]) => {

        const date = new Date(news.date || Date.now());

        newsContainer.innerHTML += `

        <div class="news-card"
        onclick="location.href='news.html?id=${id}'"
        style="cursor:pointer;">

            <img src="${news.image}" alt="News">

            <div>

                <small style="color:#c00000;font-weight:bold;">
                ${news.category}
                </small>

                <h2>${news.title}</h2>

                <p>${news.description.substring(0,120)}...</p>

                <br>

                <small>
                📅 ${date.toLocaleDateString("hi-IN")}
                </small>

            </div>

        </div>

        `;

    });

}

// Live Search

if(searchInput){

searchInput.addEventListener("keyup",()=>{

    const value =
    searchInput.value.toLowerCase();

    const filter =
    allNews.filter(([id,news])=>

    news.title.toLowerCase().includes(value) ||

    news.description.toLowerCase().includes(value)

    );

    showNews(filter);

});

}
