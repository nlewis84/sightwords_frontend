const BASE_URL = "http://localhost:3000";
const LIST_URL = "http://localhost:3000/api/v1/lists";
const SIGHTWORD_URL = "http://localhost:3000/api/v1/sightwords";

document.addEventListener('DOMContentLoaded', () => {
    getLists();
    selectScreen();

});

function getLists() {
    fetch(LIST_URL)
        .then(response => response.json())
        .then(lists => {
            lists.data.forEach(list => {
                let newList = new List(list, list.attributes)
                document.querySelector('#list-container').innerHTML += newList.renderListCard()

                list.attributes.sightwords.forEach(word => {
                    let newWord = new Sightword(word);
                    document.querySelector(`#words-${list.id}`).innerHTML += newWord.renderSightword();
                })
                // newList.listWords()
            })
        })
}

function selectScreen() {
    setTimeout(() => {
        const button = document.querySelectorAll('button');

        button.forEach(e => {
            e.addEventListener('click', (e) => {
                document.querySelector('#list-container').innerHTML = "";
                const currentListId = parseInt(e.currentTarget.attributes[0].nodeValue)
                const currentList = List.all.find(e => e.id === currentListId)

                playGame(currentList);
            })
        });

    }, 1000)

}

