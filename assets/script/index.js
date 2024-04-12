"use strict";

import { onEvent, select } from "./utils.js";

const loginBtn = select(".login-button");

const storedLoginDetails = JSON.parse(localStorage.getItem("login"));
const loginDetails = storedLoginDetails ? storedLoginDetails : [{ email: "random@mail.com", password: "pass" }];

let invalidMsg = select(".error-message");

function loginPage() {
    let email = select(".mail").value.trim().toLowerCase();  
    let password = select(".password").value.trim();

    let isValidEmail = email.length > 0;
    let isValidPassword = password.length > 0;

    // Check for email and password match in a case-insensitive manner for the email
    let isMatch = loginDetails.some(details => 
        details.email.toLowerCase() === email && details.password === password
    );

    let message = (!isValidEmail ? "Email is required " : "") +
                  (!isValidPassword ? "Password is required " : "") +
                  (!isMatch && isValidEmail && isValidPassword ? "Wrong email or password" : "");

    invalidMsg.classList.toggle("is-visible", message !== "");
    invalidMsg.innerHTML = message;

    if (isMatch) {
        select(".mail").value = "";
        select(".password").value = "";
        window.location.href = "home.html"; // Redirect to home.html if login is successful
    }
}

onEvent("click", loginBtn, () => {
    loginPage();
});
