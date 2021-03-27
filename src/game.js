// Main function of playing the game
function playGame(list) {
    const gameList = list
    gameList.listWords().forEach(e => {
        addWordBox(e);
    })
}

// Adds a formatted word to the page
function addWordBox(wordObj) {
    let characterized = wordObj.characterize();
    spanized(characterized);
    const container = document.querySelector('#list-container');
    const newDiv = document.createElement("div");
    newDiv.className = "word-box";
    container.appendChild(newDiv);
    let audio = wordObj.renderAudio();
    container.lastElementChild.innerHTML = audio
    addInput(wordObj);

}


// Makes every letter of an array into the letter contained in a span
function spanized(array) {
    const container = document.querySelector('#list-container');
    const newDiv = document.createElement("div");
    newDiv.className = "word-text";
    container.appendChild(newDiv);

    array.forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        container.lastElementChild.appendChild(charSpan)
    })
}

// Adds the input field to a word
function addInput(e) {
    const input = document.createElement("input");
    input.type = "text";
    input.id = e.id;
    input.size = "10";

    const container = document.querySelector('#list-container');
    const newDiv = document.createElement("div");
    newDiv.className = "word-input";
    container.appendChild(newDiv);
    container.lastElementChild.appendChild(input);
    input.addEventListener("input", inputListener);


}

// Add listener to input field to check against the game logic
function inputListener(e) {
    currentInput = e.target.value;
    currentInputArray = currentInput.split('');
    currentWord = this.parentElement.previousElementSibling.previousElementSibling;
    currentWordSpanArray = currentWord.querySelectorAll('span');
    currentWordArray = currentWord.innerText.split('');

    // Main game logic ... This could be made into its own function.
    currentWordSpanArray.forEach((char, index) => {
        let typedChar = currentInputArray[index]

        // character not currently typed 
        if (typedChar == null) {
            char.classList.remove('correct-char');
            char.classList.remove('incorrect-char');

            // correct character 
        } else if (typedChar === char.innerText) {
            char.classList.add('correct-char');
            char.classList.remove('incorrect-char');

            // incorrect character 
        } else {
            char.classList.add('incorrect-char');
            char.classList.remove('correct-char');
        }
    });


}

