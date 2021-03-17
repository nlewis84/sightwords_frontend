// initial state
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let wordId = 0;



function playGame(list) {

    const gameList = list
    gameList.listWords().forEach(e => {

        // addAudio(e);
        // addText(e);
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

    // newDiv.innerText += spanWord;

}

// function addAudio(wordObj) {
// const container = document.querySelector('#list-container');
// const newDiv = document.createElement("div");
// newDiv.className = "word-box";
// container.appendChild(newDiv);
// let audio = wordObj.renderAudio();
// document.querySelector('#list-container').innerHTML = audio;
// }

// function addText(wordObj) {

//     const newDiv = document.createElement("div");
//     newDiv.className = "word-box";

//     const body = document.querySelector('body');
//     body.append(newDiv);

//     let characterized = wordObj.characterize()

//     spanized(characterized)

//     // newDiv.innerText = wordObj.characterize()

// }

function spanized(array) {
    array.forEach(char => {
        const container = document.querySelector('#list-container');
        const newDiv = document.createElement("div");
        // const wordDiv = document.body.lastElementChild;
        const charSpan = document.createElement('span')

        charSpan.innerText = char
        container.lastElementChild.appendChild(charSpan)
        // newDiv.appendChild(charSpan)

    })
}