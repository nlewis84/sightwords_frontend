const BASE_URL = "http://localhost:3000";
const LIST_URL = "http://localhost:3000/api/v1/lists";
const SIGHTWORD_URL = "http://localhost:3000/api/v1/sightwords";

document.addEventListener('DOMContentLoaded', () => {
    getLists();
    selectScreen();

    const createListForm = document.querySelector("#create-list-form")

    createListForm.addEventListener("submit", (e) => {
        createFormHandler(e)
    })

    const createWordForm = document.querySelector("#create-word-form")

    createWordForm.addEventListener("submit", (e) => {
        createWordFormHandler(e)
    })
});

function getLists() {
    fetch(LIST_URL)
        .then(response => response.json())
        .then(lists => {
            lists.data.forEach(list => {
                let newList = new List(list, list.attributes)
                document.querySelector('#list-container').innerHTML += newList.renderListCard()

                addOption(list.attributes.name, list.id)

                list.attributes.sightwords.forEach(word => {
                    let newWord = new Sightword(word);
                    document.querySelector(`#words-${list.id}`).innerHTML += newWord.renderSightword();
                })

            })
        })
}

function selectScreen() {
    setTimeout(() => {
        const button = document.querySelectorAll('button.select');

        button.forEach(e => {
            e.addEventListener('click', (e) => {
                document.querySelector('#list-container').innerHTML = "";
                const currentListId = parseInt(e.currentTarget.attributes[1].nodeValue)
                const currentList = List.all.find(e => e.id === currentListId)

                playGame(currentList);
            })
        });

    }, 1000)

}

function createFormHandler(e) {
    e.preventDefault();
    console.log(e);
    const nameInput = document.querySelector("#input-name").value;
    postListFetch(nameInput);
}

function createWordFormHandler(e) {
    e.preventDefault();
    console.log(e);

    const wordInput = document.querySelector("#input-word").value;
    const pronunciationInput = document.querySelector("#input-pronunciation-url").value;
    const listsInput = document.querySelector("#lists").value;
    const listId = parseInt(listsInput)

    postWordFetch(wordInput, pronunciationInput, listId);
}

function postListFetch(name) {
    const bodyData = { name };

    fetch(LIST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
    })
        .then(response => response.json())
        .then(list => {
            let newList = new List(list, list.data.attributes)
            document.querySelector('#list-container').innerHTML += newList.renderListCard()

            addOption(list.attributes.name, list.id)

            list.data.attributes.sightwords.forEach(word => {
                let newWord = new Sightword(word);
                document.querySelector(`#words-${list.id}`).innerHTML += newWord.renderSightword();
            })
        })
}

function postWordFetch(word, pronunciation_url, list_id) {
    const bodyData = { word, pronunciation_url, list_id };

    fetch(SIGHTWORD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
    })
        .then(response => response.json())
        .then(list => {
            window.location.reload();
        })
}

function addOption(name, value) {
    let option = document.createElement("option");
    let select = document.querySelector("#lists");
    option.text = name;
    option.value = value;
    select.add(option);
}