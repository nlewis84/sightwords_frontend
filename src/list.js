class List {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        List.all.push(this);
    }

}

List.all = [];