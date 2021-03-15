class Sightword {
    constructor(data) {
        this.id = data.id;
        this.word = data.word;
        this.pronunciation_url = data.pronunciation_url;
        Sightword.all.push(this);
    }

    renderSightword() { return `<li>${this.word}</li>` }
}

Sightword.all = [];