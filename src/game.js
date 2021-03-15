function playGame() {
    setTimeout(() => {
        let audio = Sightword.all[0].renderAudio()
        document.querySelector('#list-container').innerHTML = "";
        document.querySelector('#list-container').innerHTML = audio;
    }, 3000)
}