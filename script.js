// @ts-nocheck
const form = document.querySelector(".inputs");
const txtInput = document.querySelector("#palindrome-input");
const checkBtn = document.querySelector(".check-button");
const resetBtn = document.querySelector(".reset-button");
const infoTxt = document.querySelector(".info-txt");
const exampleBtns = document.querySelectorAll(".example-chip");

const cleanInput = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const setResult = (type, value, suffix) => {
    infoTxt.replaceChildren();
    infoTxt.className = `info-txt status-card ${type}`;

    const phrase = document.createElement("span");
    phrase.textContent = value;

    const ending = document.createTextNode(suffix);

    infoTxt.append(" ", phrase, ending);
};

const resetResult = () => {
    infoTxt.replaceChildren();
    infoTxt.className = "info-txt status-card";
};

const syncState = () => {
    const hasText = cleanInput(txtInput.value).length > 0;
    checkBtn.disabled = !hasText;
    checkBtn.classList.toggle("active", hasText);

    if(!hasText){
        resetResult();
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const filteredInput = cleanInput(txtInput.value);
    if(!filteredInput){
        resetResult();
        return;
    }

    const reverseInput = filteredInput.split("").reverse().join("");

    if(filteredInput !== reverseInput){
        setResult("negative", txtInput.value, " is not a palindrome");
        return;
    }

    setResult("positive", txtInput.value, " is a palindrome");
});

txtInput.addEventListener("input", syncState);

resetBtn.addEventListener("click", () => {
    txtInput.value = "";
    txtInput.focus();
    syncState();
});

exampleBtns.forEach((button) => {
    button.addEventListener("click", () => {
        txtInput.value = button.dataset.example;
        txtInput.focus();
        syncState();
        form.requestSubmit();
    });
});

syncState();
