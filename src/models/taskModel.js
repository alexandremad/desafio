// Alexandre Souza
const moment = require('moment');

class Task {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = moment().format();
        this.updatedAt = moment().format();
        this.completedAt = null;
    }
}

module.exports = Task;
