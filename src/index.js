const BASE_URL = "http://localhost:3000";
const LIST_URL = "http://localhost:3000/api/v1/lists";
const SIGHTWORD_URL = "http://localhost:3000/api/v1/sightwords";

document.addEventListener('DOMContentLoaded', () => {
    getLists();
});

function getLists() {
    fetch(LIST_URL)
        .then(response => response.json())
        .then(lists => {
            lists.data.forEach(list => {
                let newList = new List(list)

                render(list)
            })
        })
}

function render(list) {
    const listMarkup = `
                    <div data-id=${list.id}>
                        <h3>${list.attributes.name}</h3>
                        <ul id="words-${list.id}"></ul>
                        <button data-id=${list.id}>select</button>
                    </div>
                    <br><br>`;

    document.querySelector('#list-container').innerHTML += listMarkup

    list.attributes.sightwords.forEach(word => {
        let newWord = new Sightword(word);

        const wordsMarkup = `
                        <li>${word.word}</li>
                    `
        document.querySelector(`#words-${list.id}`).innerHTML += wordsMarkup
    })
}
