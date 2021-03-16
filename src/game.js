function playGame(list) {

    const gameList = list
    gameList.listWords().forEach(e => {
        addAudio(e);
        addTextInput(e);
    })
}

function addAudio(wordObj) {
    let audio = wordObj.renderAudio();
    // 
    document.querySelector('#list-container').innerHTML = audio;
}

function addTextInput(wordObj) {

}