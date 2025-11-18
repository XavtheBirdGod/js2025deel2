// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

// Eigen JS
async function loadPost() {
    const id = Number(document.getElementById("ex3_post_id").value);
    const status = document.getElementById("ex3_status");
    const cardPost = document.getElementById("ex3_post_card");
    const cardCom = document.getElementById("ex3_comments_card");
    const title = document.getElementById("ex3_title");
    const body = document.getElementById("ex3_body");
    const list = document.getElementById("ex3_comments_list");
    const empty = document.getElementById("ex3_comments_empty");

    if (!id || id < 1) {
        status.className = "alert alert-danger";
        status.innerText = "Vul een nummer groter dan 0 in";
        return;
    }

    status.className = "alert alert-warning";
    status.innerText = "Bezig met laden...";

    try {

        const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!postRes.ok) throw new Error("Post niet gevonden");
        const post = await postRes.json();

        title.innerText = post.title;
        body.innerText = post.body;
        cardPost.classList.remove("d-none");

        const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        if (!commentsRes.ok) throw new Error("Kon comments niet laden");
        const comments = await commentsRes.json();

        if (comments.length > 0) {
            list.innerHTML = comments.map(c => `
                <li class="list-group-item">
                    <strong>${c.name}</strong> <em>(${c.email})</em>
                    <p class="mb-0">${c.body}</p>
                </li>
            `).join("");
        }

        cardCom.classList.remove("d-none");
        status.className = "alert alert-success";
        status.innerText = `Post en ${comments.length} comment(s) geladen!`;
        empty.innerText = `${comments.length} comment(s) geladen!`;

    } catch (err) {
        status.innerText = "❌ Kon JSON niet laden";
        console.error(err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ex3_btn")?.addEventListener("click", loadPost);
});
