class List {
    constructor(list, listAttributes) {

        this.id = list.id;
        this.name = listAttributes.name;
        List.all.push(this);

    }

    renderListCard() {
        return `
                            <div data-id=${this.id}>
                                <h3>${this.name}</h3>
                                <ul id="words-${this.id}"></ul>
                                <button data-id=${this.id}>select</button>
                            </div>
                            <br><br>`;





    }
}

List.all = [];