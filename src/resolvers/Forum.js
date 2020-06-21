class Forum {
    constructor(id, {
        title,
        description,
        userId,
        isPrivate,
        ...rest
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isPrivate = this.isPrivate;
        this.admin = userId;
        this.users = [userId]
        this.messages = [];
        this.rest = rest;
    }
}

module.exports = Forum;

