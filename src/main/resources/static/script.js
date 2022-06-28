const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMsg = document.getElementById("final-message");

//get all elements with this class into array
const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

//get random words from the array
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//show hidded word
function displayWord() {
    wordEl.innerHTML = `${selectedWord
        .split("")
        .map(
            (letter) => `
            <span class="letter"> ${
                correctLetters.includes(letter) ? letter : ""
            }</span>
            `
        )
        .join("")}`;
    const innerWord = wordEl.innerText.replace(/\n/g, "");

    if (innerWord === selectedWord) {
        finalMsg.innerText = "Congratulations! You won!";
        setTimeout(() => {
            popup.style.display = "flex";
        }, 700);
    }
}

//update wrong letters
function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
            part.style.display = "block";
        } else {
            part.style.display = "none";
        }
    });

    //check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMsg.innerText = "Unfortunately you lost. So sad...";
        setTimeout(() => {
            popup.style.display = "flex";
        }, 500);
    }
}

//show notifitcation
function showNotification() {
    notification.classList.add("show");
    setTimeout(() => {
        notification.classList.remove("show");
    }, 2500);
}

//keydown letter press
window.addEventListener("keydown", (e) => {
    var keyCode = e.keyCode;
    if (keyCode >= 65 && keyCode <= 90) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

//restart game
playAgainBtn.addEventListener("click", () => {
    //clear arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    //choose another word
    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLettersEl();

    popup.style.display = "none";
});

displayWord();