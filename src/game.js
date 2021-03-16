function playGame(list) {

    const gameList = list
    gameList.listWords().forEach(e => {
        addAudio(e);
    })
    debugger



    // setTimeout(() => {
    //     debugger
    //     let audio = Sightword.all[0].renderAudio()
    //     document.querySelector('#list-container').innerHTML = "";
    //     document.querySelector('#list-container').innerHTML = audio;

    // }, 3000)
}

function addAudio(e) {
    let audio = e.renderAudio();
    document.querySelector('#list-container').innerHTML = "";
    document.querySelector('#list-container').innerHTML = audio;
}