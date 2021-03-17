// initial state
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let wordId = 0;



function playGame(list) {

    const gameList = list
    gameList.listWords().forEach(e => {
        addWordBox(e);
    })
}

function addWordBox(wordObj) {
    const container = document.querySelector('#list-container');
    const newDiv = document.createElement("div");
    newDiv.className = "word-box";
    container.appendChild(newDiv);
    let audio = wordObj.renderAudio();
    container.lastElementChild.innerHTML = audio
    let characterized = wordObj.characterize();
    spanized(characterized);
}

function spanized(array) {
    array.forEach(char => {
        const container = document.querySelector('#list-container');
        const newDiv = document.createElement("div");
        const charSpan = document.createElement('span')

        charSpan.innerText = char
        container.lastElementChild.appendChild(charSpan)
    })
}