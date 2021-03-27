const BASE_URL = "http://localhost:3000";
const LIST_URL = "http://localhost:3000/api/v1/lists";
const SIGHTWORD_URL = "http://localhost:3000/api/v1/sightwords";
let darkModeOn = false;

// DOMContentLoaded -- Site setup
document.addEventListener('DOMContentLoaded', () => {
    formButtons();
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

// Setup your Form Manipulation Buttons
function formButtons() {
    const newListButton = document.querySelector("button#new-list");
    const newWordButton = document.querySelector("button#new-word");
    //dark mode
    const darkModeButton = document.querySelector("button#dark-mode");
    const listForm = document.querySelector("#create-list-form");
    const wordForm = document.querySelector("#create-word-form");

    // Toggle the display of these forms
    newListButton.onclick = function () {
        if (listForm.style.display === "none") {
            document.querySelector("#create-list-form").style = "display: block;"
        } else {
            document.querySelector("#create-list-form").style = "display: none;"
        }
    }
    newWordButton.onclick = function () {
        if (wordForm.style.display === "none") {
            document.querySelector("#create-word-form").style = "display: block;"
        } else {
            document.querySelector("#create-word-form").style = "display: none;"
        }
    }

    // Dark mode on click
    // Needs some work on the game page divs

    // darkModeButton.onclick = function () {
    //     if (darkModeOn === false) {
    //         document.querySelector("body").style = "background-color: var(--color4);"
    //         let all = document.querySelectorAll("div.word-text");
    //         for (let i = 0; i < all.length; i++) {
    //             all[i].style = "background-color: var(--color4);"
    //         }
    //         darkModeOn = true;
    //     } else {
    //         document.querySelector("body").style = "background-color: var(--color1);"
    //         let all = document.querySelectorAll("div.word-text");
    //         for (let i = 0; i < all.length; i++) {
    //             all[i].style = "background-color: var(--color1);"
    //         }
    //         darkModeOn = false;
    //     }
    // }
}
// Dry up the toggle above!

// List fetch
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

// Build the "index" select screen
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

// Create List Form
function createFormHandler(e) {
    e.preventDefault();
    console.log(e);
    const nameInput = document.querySelector("#input-name").value;
    postListFetch(nameInput);
}

// Create Word Form
function createWordFormHandler(e) {
    e.preventDefault();
    console.log(e);

    const wordInput = document.querySelector("#input-word").value;
    const pronunciationInput = document.querySelector("#input-pronunciation-url").value;
    const listsInput = document.querySelector("#lists").value;
    const listId = parseInt(listsInput)

    postWordFetch(wordInput, pronunciationInput, listId);
}

// Post Fetch for adding a new list
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

// Post Fetch for adding words to lists
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

// Add an option to the dropdown for available lists
function addOption(name, value) {
    let option = document.createElement("option");
    let select = document.querySelector("#lists");
    option.text = name;
    option.value = value;
    select.add(option);
}