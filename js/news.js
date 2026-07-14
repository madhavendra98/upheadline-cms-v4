import { db } from "./firebase-config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const params = new URLSearchParams(window.location.search);
const newsId = params.get("id");

const newsContainer = document.getElementById("newsDetails");

if (!newsId) {
    newsContainer.innerHTML = "<h2>News Not Found</h2>";
} else {

    onValue(ref(db, "news/" + newsId), (snapshot) => {

        if (!snapshot.exists()) {
            newsContainer.innerHTML = "<h2>News Not Found</h2>";
            return;
        }

        const news = snapshot.val();

        newsContainer.innerHTML = `
        <div class="news-details">

            <img src="${news.image}" 
                 style="width:100%;max-height:450px;object-fit:cover;border-radius:10px;">

            <h1 style="margin-top:20px;">
                ${news.title}
            </h1>

            <p style="color:red;font-weight:bold;">
                ${news.category}
            </p>

            <p style="margin-top:20px;font-size:18px;line-height:1.8;">
                ${news.description}
            </p>

            <br>

            <button onclick="history.back()"
            style="
            padding:12px 25px;
            background:#c00000;
            color:white;
            border:none;
            border-radius:6px;
            cursor:pointer;">
            ← Back
            </button>

        </div>
        `;

    });

}
