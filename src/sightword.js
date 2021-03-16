class Sightword {
    constructor(data) {
        this.id = data.id;
        this.word = data.word;
        this.pronunciation_url = data.pronunciation_url;
        this.list_id = data.list_id
        Sightword.all.push(this);
    }

    renderSightword() { return `<li>${this.word}</li>` }

    renderAudio() {
        return `<audio controls id="audio-${this.id}" src="${this.pronunciation_url}"></audio>`
    }

    characterize() {
        return this.word.split("")
    }

}

Sightword.all = [];