// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

// Import modules
import User from "./userModel.js";
import {userCard} from "./userCard.js";

const users = [];

//eigen js
function loadCards() {
    const naam = document.getElementById("ex4_name").value.trim();
    const age = Number(document.getElementById("ex4_age").value);
    const status = document.getElementById("ex4_status");
    const list = document.getElementById("ex4_list");

    if (!naam || !age) {
        status.className = "alert alert-danger mb-3";
        status.innerText = "Gelieve een naam en een geldige leeftijd in te vullen";
    } else {
        const user = new User(naam, age);
        users.push(user);

        list.innerHTML = "";
        users.forEach(u => {
            list.innerHTML += userCard(u);
        });

        status.className = "alert alert-success mb-3";
        status.innerText = `${users.length} gebruiker(s) toegevoegd.`;
    }

}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ex4_btn")
        ?.addEventListener("click", loadCards);
});
