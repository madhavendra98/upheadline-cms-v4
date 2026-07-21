import { db } from "./firebase-config.js";

import {
  ref,
  push,
  onValue,
  remove,
  update,
  set
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// =============================
// ImgBB API Key
// =============================

const IMGBB_KEY = "a7696bd67a3c728c76935a34574a27aa";

// =============================
// Publish News
// =============================

window.publishNews = async function () {

    const title = document.getElementById("title").value.trim();

    const description = window.quill.root.innerHTML;

    const category =
    document.getElementById("category").value;
    const caption =
    document.getElementById("caption").value.trim();
    const file =
    document.getElementById("imageFile").files[0];

    if(!title || !description){

        alert("Title और Description भरें");

        return;

    }

    let image =
    "https://picsum.photos/600/350";

    if(file){

        const formData = new FormData();

        formData.append("image",file);

        const response = await fetch(

        "https://api.imgbb.com/1/upload?key="+IMGBB_KEY,

        {

            method:"POST",

            body:formData

        });

        const result = await response.json();

        if(result.success){

            image = result.data.url;

        }

    }

   await push(ref(db,"news"),{

    title,
    description,
    category,
    image,
    caption,
    date:Date.now()

});

    alert("✅ News Published Successfully");

    location.reload();

};
// =============================
// Show Published News
// =============================

const newsList = document.getElementById("newsList");

onValue(ref(db, "news"), (snapshot) => {

    if (!newsList) return;

    newsList.innerHTML = "";

    if (!snapshot.exists()) {

        newsList.innerHTML = "<h3>No News Available</h3>";

        return;

    }

    const data = snapshot.val();

    Object.entries(data).reverse().forEach(([id, news]) => {

        newsList.innerHTML += `

<div class="news-card">

<img src="${news.image || 'https://picsum.photos/400/250'}"
style="width:100%;height:180px;object-fit:cover;">

<div style="padding:15px;">

<small style="color:red;">
${news.category}
</small>

<h3>${news.title}</h3>

<p>
${news.description.replace(/<[^>]*>/g,"").substring(0,120)}...
</p>

<button onclick="editNews('${id}')">
✏️ Edit
</button>

<button onclick="deleteNews('${id}')"
style="background:#d00;margin-top:10px;">
🗑 Delete
</button>

</div>

</div>

`;

    });

});

// =============================
// Delete News
// =============================

window.deleteNews = async function(id){

    if(!confirm("क्या आप News Delete करना चाहते हैं?"))
        return;

    await remove(ref(db,"news/"+id));

    alert("✅ News Deleted");

};

// =============================
// Edit News
// =============================

window.editNews = async function(id){

    const title = prompt("New Title");

    if(title==null) return;

    const caption = prompt("Photo Caption");

    if(caption==null) return;

    const description = prompt("New Description");

    if(description==null) return;

    await update(ref(db,"news/"+id),{

        title,
        caption,
        description

    });

    alert("✅ News Updated");

};
// =============================
// Save Breaking News
// =============================

window.saveBreakingNews = async function () {

    const text = document
        .getElementById("breakingNews")
        .value
        .trim();

    if (!text) {

        alert("Breaking News लिखें");

        return;

    }

    await set(ref(db, "settings"), {

        breakingNews: text

    });

    alert("✅ Breaking News Saved");

};

// =============================
// Load Breaking News
// =============================

const breakingInput =
document.getElementById("breakingNews");

if (breakingInput) {

    onValue(ref(db, "settings"), (snapshot) => {

        if (!snapshot.exists()) return;

        const data = snapshot.val();

        if (data.breakingNews) {

            breakingInput.value = data.breakingNews;

        }

    });

}

console.log("✅ UPHeadline Admin Loaded Successfully");

