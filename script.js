// CORS headers for some reason did not work, so I came to 2 ways of disabling this policies:
// 1) win+r
//    paste there
//    chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
//    So we open Chrome instance without web security
//
// or just
//
// 2) install https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf

function httpGet() {
    console.clear();
    let xhr = new XMLHttpRequest();
    let inputLink = document.getElementById("inputLink").value;
    xhr.open('GET', inputLink, false);

    xhr.onload = function () {
        return xhr.response;
    };

    xhr.send();

    let response = xhr.onload();

    // when I tried just to parse this response string with DOMParser() - innerText and innerHTML, etc. were undefined
    // so I decided to fulfill a html element with the result and after that get text out of it

    let element = document.getElementById("txt");
    element.innerHTML = response;

    console.log("Link to check: ", inputLink);
    letters(element.innerText.replace(/\s/g, ""));
}

function letters(str) {
    let lettersMap = {};
    let letter, countOfEachLetter, sumOfLetters = 0;

    for (let i = 0; i < str.length; ++i) {
        // we count only latin alphabet letters
        if ((str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) || (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122)) {
            letter = str.charAt(i);

            countOfEachLetter = lettersMap[letter];

            if (countOfEachLetter) {
                lettersMap[letter] = countOfEachLetter + 1;
            } else {
                lettersMap[letter] = 1;
            }

            sumOfLetters++;
        }
    }

    // output
    let counter = 0, percentage = 0;
    console.log("Amount of each alphabetical letter and it's weight (non-capital letters are included): ");
    for (let i = 65; i <= 90; ++i) {
        counter = (lettersMap[String.fromCharCode(i)] || 0) + (lettersMap[String.fromCharCode(i + 32)] || 0);
        percentage = counter / sumOfLetters * 100;
        console.log(String.fromCharCode(i), " count: ", counter, "\t\tPercentage: ", percentage.toFixed(3), "%");
    }
    console.log("Total sum of letters: ", sumOfLetters);
}