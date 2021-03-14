const endPoint = "http://localhost:3000/api/v1/lists";

document.addEventListener('DOMContentLoaded', () => {
    getLists();
});

function getLists() {
    fetch(endPoint)
        .then(response => response.json())
        .then(lists => {
            console.log(lists);
            lists.data.forEach(list => {
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
        const wordsMarkup = `
                        <li>${word.word}</li>
                    `
        document.querySelector(`#words-${list.id}`).innerHTML += wordsMarkup
    })
}
