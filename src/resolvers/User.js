class User {
    constructor(id, {
        name,
        email,
        password,
        url,
        ...rest
    }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.url = url;
        this.rest = rest;
    }
}

module.exports = User;