import { db } from "./firebase-config.js";
import {
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const params = new URLSearchParams(window.location.search);
const newsId = params.get("id");

const newsContainer = document.getElementById("newsDetails");

if (!newsId) {

    newsContainer.innerHTML = `
        <h2 style="text-align:center;color:red;">
            News Not Found
        </h2>
    `;

} else {

    onValue(ref(db, "news/" + newsId), (snapshot) => {

        if (!snapshot.exists()) {

            newsContainer.innerHTML = `
                <h2 style="text-align:center;color:red;">
                    News Not Found
                </h2>
            `;

            return;
        }

        const news = snapshot.val();

        document.title = news.title + " | UPHeadline";

        const pageUrl = window.location.href;

        let newsDate = "";

        if(news.date){

            newsDate = new Date(news.date).toLocaleString("hi-IN");

        }else{

            newsDate = new Date().toLocaleString("hi-IN");

        }

        newsContainer.innerHTML = `

        <img src="${news.image}" class="news-main-image">

        <p style="
        text-align:center;
        color:#666;
        font-size:14px;
        margin-top:8px;
        font-style:italic;
        ">

        ${news.caption ? "📷 " + news.caption : ""}

        </p>

        <div class="news-category">

            ${news.category || "Latest News"}

        </div>

        <h1 class="news-title">

            ${news.title}

        </h1>

        <div class="news-date">

            📰 UPHeadline |
            ${newsDate}

        </div>

        <div class="news-content">

            ${news.description}

        </div>

        <hr>

        <div class="share-box">

            <h3>📤 Share News</h3>

            <a class="wa"
            target="_blank"
            href="https://wa.me/?text=${encodeURIComponent(news.title+" "+pageUrl)}">

            WhatsApp

            </a>

            <a class="fb"
            target="_blank"
            href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}">

            Facebook

            </a>

            <a class="x"
            target="_blank"
            href="https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=${encodeURIComponent(pageUrl)}">

            X

            </a>

        </div>

        <br>

        <a href="index.html" class="back-home">

            🏠 Home

        </a>

        `;

    });

}
