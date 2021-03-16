function playGame(list) {
    debugger
    const listId = list
    getList(listId)
    setTimeout(() => {

        let audio = Sightword.all[0].renderAudio()
        document.querySelector('#list-container').innerHTML = "";
        document.querySelector('#list-container').innerHTML = audio;

    }, 3000)
}

// function getList(listId) {
//     fetch(`http://localhost:3000/api/v1/lists/${listId}`)
//         .then(response => response.json())
//         .then(list => {
//             wordArray = list.data.attributes.sightwords
//         })
// }
