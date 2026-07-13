import { db } from "./firebase-config.js";

import {
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const newsContainer = document.getElementById("newsContainer");
const trendingNews = document.getElementById("trendingNews");
const searchInput = document.getElementById("searchInput");

let allNews = [];

// ===============================
// Load News
// ===============================

onValue(ref(db, "news"), (snapshot) => {

    if (!snapshot.exists()) {

        newsContainer.innerHTML = `
        <h2 style="text-align:center;color:red;">
        कोई समाचार उपलब्ध नहीं है।
        </h2>`;

        return;

    }

    const data = snapshot.val();

    allNews = Object.entries(data).reverse();

    displayNews(allNews);

    displayTrending(allNews);

});

// ===============================
// Display News
// ===============================

function displayNews(newsArray){

    newsContainer.innerHTML = "";

    newsArray.forEach(([id,news])=>{

        const image =
        news.image ||
        "https://picsum.photos/600/350";

        const date =
        new Date(news.date || Date.now());

        newsContainer.innerHTML += `

<div class="news-card"
onclick="location.href='news.html?id=${id}'">

<img src="${image}" alt="News">

<div>

<small style="color:#c00000;font-weight:bold;">
${news.category}
</small>

<h2>${news.title}</h2>

<p>

${news.description.substring(0,120)}...

</p>

<br>

<small>

📅 ${date.toLocaleDateString("hi-IN")}

</small>

</div>

</div>

`;

    });

}
// ===============================
// Trending News
// ===============================

function displayTrending(newsArray){

    if(!trendingNews) return;

    trendingNews.innerHTML = "";

    newsArray.slice(0,5).forEach(([id,news],index)=>{

        trendingNews.innerHTML += `

        <div class="trend-item"
        onclick="location.href='news.html?id=${id}'"
        style="cursor:pointer">

            <span>${index+1}</span>

            <p>${news.title}</p>

        </div>

        `;

    });

}

// ===============================
// Live Search
// ===============================

if(searchInput){

searchInput.addEventListener("keyup",()=>{

    const value = searchInput.value.toLowerCase();

    const filtered = allNews.filter(([id,news])=>{

        return (

            news.title.toLowerCase().includes(value) ||

            news.description.toLowerCase().includes(value) ||

            news.category.toLowerCase().includes(value)

        );

    });

    displayNews(filtered);

    displayTrending(filtered);

});

}

// ===============================
// Breaking News
// ===============================

const breaking = document.getElementById("breakingNews");

onValue(ref(db,"settings"),(snapshot)=>{

    if(!snapshot.exists()) return;

    const data = snapshot.val();

    if(breaking && data.breakingNews){

        breaking.innerHTML = "🔥 " + data.breakingNews;

    }

});

// ===============================
// Current Date
// ===============================

const currentDate = document.getElementById("currentDate");

if(currentDate){

currentDate.innerHTML = new Date().toLocaleString("hi-IN",{

weekday:"long",
day:"numeric",
month:"long",
year:"numeric",
hour:"2-digit",
minute:"2-digit"

});

}
