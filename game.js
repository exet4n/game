let genNumber;
let maxTries;
let maxNumber;
let minNumber;

function decimalNums() {
    document.getElementById("inputs").addEventListener("keydown", function (e) {
        if (e.key === '.' || e.key === ',' || e.key === 'e') {
            e.preventDefault();
        }
    });
}

function rules() {
    let rules = document.getElementById ("rules");
    if (rules.style.display === "none") {
        rules.style.display = "";
    }
    else if (rules.style.display === "") {
        rules.style.display = "none";
    }
}

function getMaxNumber() {
    let maxNum = document.getElementById ("maxNumber").value;
    maxNum = parseInt(maxNum);
    return maxNum
}

function stepMaxNumber(stepSize) {
    maxNumber = getMaxNumber();

    if (maxNumber === "undefined" || isNaN(maxNumber)) maxNumber = 0;
    maxNumber += stepSize;
    document.getElementById ("maxNumber").value = maxNumber;
}

function getTries() {
    let maxAttempts = document.getElementById ("maxTries").value;
    maxAttempts = parseInt(maxAttempts);

    if (maxAttempts < 2) {
        window.alert ("Maximale Versuche müssen 2 oder mehr sein");
        return;
    }
    return maxAttempts
}

function stepMaxTries(stepSize) {
    maxTries = getTries();

    if (isNaN(maxTries)) maxTries = 0;
    maxTries += stepSize

    if (maxTries < 2) {
        maxTries = 2;
    }
    document.getElementById ("maxTries").value = maxTries;
}

function optionalSettings() {
    let button = document.getElementById ("optionalSettings");
    if (button.style.display === "none") {
        button.style.display = "";
    }
    else if (button.style.display === "") {
        button.style.display = "none";
    }
}

function getMinNumber() {
    let minNum = document.getElementById ("minNumber").value;
    minNum = parseInt(minNum);
    if (isNaN(minNum)) {
        minNum = 0;
    }
    return minNum
}

function stepMinNumber(stepSize) {
    minNumber = getMinNumber();

    if (minNumber === "undefined" || isNaN(minNumber)) minNumber = 0;
    minNumber += stepSize;
    document.getElementById ("minNumber").value = minNumber;
}

function start() {
    maxNumber = getMaxNumber();
    maxTries = getTries();
    minNumber = getMinNumber();
    const range = maxNumber - minNumber;
    if (range < 10) {
        window.alert ("Range ist zu klein");
        return;
    }
    if (isNaN(maxNumber)) {
        window.alert ("Maximale Zahl fehlt");
        return;
    }
    if (isNaN(maxTries)) {
        window.alert ("Anzahl der Versuche fehlt");
        return;
    }
    
    document.getElementsByClassName ("resOptions") [0].innerHTML = "";

    const generatedNumber = Math.floor(Math.random() * (range + 1)) + minNumber;
    genNumber = generatedNumber;
    
    intGame(maxNumber, maxTries);

    const array = document.getElementsByClassName ("cfg");
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        element.style.display = "none";
    }
}

function intGame(maxNumber, maxTries) {
    document.getElementById ("maxNumBetween").innerHTML = maxNumber;
    document.getElementById ("tries").innerHTML = maxTries;
    document.getElementById ("minNumBetween").innerHTML = minNumber;
    
    const array = document.getElementsByClassName ("game");
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        element.style.display = "flex";
    }
}

function tryField(event) {    
    if (event.key != "Enter") {
        return;
    }

    let tries = parseInt(document.getElementById ("tries").innerHTML);
    if(tries <= 0) {
        return;
    }

    let guessNumber = document.getElementById("tryField").value;
    guessNumber = parseInt(guessNumber);
    document.getElementById("tryField").value = "";

    if (numCheck(guessNumber) != true) {
        return;
    }

    if (guessNumber == genNumber) {
        showRes(guessNumber, "ist richtig!");
        triesCounter(true);
    }
    else if (guessNumber < genNumber) {
        showRes(guessNumber, "&#129029;");
        triesCounter(false);
    }
    else {
        showRes(guessNumber, "&#129031;");
        triesCounter(false);
    }
}

function numCheck(guessNumber) {
    if (guessNumber > maxNumber) {
        window.alert ("Maximale Zahl ist " + maxNumber);
        return;
    }
    if (guessNumber < minNumber) {
        window.alert ("Minimale Zahl ist " + minNumber);
        return;
    }
    if (isNaN(guessNumber)) {
        window.alert ("Sie müssen eine Zahl eingeben");
        return;
    }
    if (compareNumbers(guessNumber) == true) {
        window.alert ("Du hast den Zahl schon geraten");
        return;
    }
    return true;
}

function showRes(guessNumber, icon) {
    const newNode = document.createElement("span");
    newNode.innerHTML = guessNumber + " " + icon;

    const results = document.getElementsByClassName ("resOptions") [0];

    if (results.children.length == 0) results.appendChild (newNode);
    else results.insertBefore(newNode, results.children[0]);
}

function triesCounter(win) {
    if (win) {
        window.alert ("Glückwunsch! Du hast gewonnen!");
        location.reload();
        return;
    }

    let tries = parseInt(document.getElementById ("tries").innerHTML);
    tries--;
    document.getElementById ("tries").innerHTML = tries;

    if (tries == 0) {
        setTimeout(() => {
            if (confirm("Keine Versuche mehr. Du hast verloren. \nMöchtest du noch einmal spielen?") == true) {
                if (confirm("Möchtest du unter diesen Bedingungen ein neues Spiel starten?") == true) {
                    start();
                    return;
                } else location.reload();
            } else location.reload();
        }, 0);
    }
}

function compareNumbers(guessNumber) {
    const results = document.getElementsByClassName ("resOptions") [0].children;
    
    const guesses = [];
    
    for (let index = 0; index < results.length; index++) {
        const child = results[index].innerHTML;
        const guess = child.split(" ")[0];
        guesses.push (parseInt(guess));
    }

    if (guesses.includes(guessNumber)) {
        return true;
    }
}