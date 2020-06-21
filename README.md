# Forum

### Create user
```javascript
mutation {
  createUser(
    user: {
      name: <name>,
      email: <email>
      url: <profilePicUrl>
    }) {
    id
    name
    email
    url
  }
}
```

## Specs
* ### A user can see the list of forums he has joined.
```javascript
uery {
  userForums(id:<userId>){
    id
    title
    description
  }
}
```

* ### A user can create a new forum (and join it automatically)
```javascript
mutation {
  createForum(
    forum: {
      title: "test1"
      description: "test1 description"
      userId: <userId>
    }
  ) {
    id
  }
}
```
* ### A user can see the list of available forum and can join any
```javascript
query {
  availableForums(id: <userId>) {
    id
    title
  }
}
```

* ### He can also join a forum if he knows the forum id
```javascript
mutation {
  joinForum(userId: <userId>, forumId: <forumId>) {
    title
  }
}
```

* ### see the list of previous messages, ordered by most recent. To be displayed in our client, a message should at least have a text, a sending time and name/picture of the sender
```javascript
query {
  getForum(id: <forumId>, userId: <userID>) {
    messages {
      text
      createdAt
      user {
        name
        url
      }
    }
  }
}
```


* ### see the name and picture of the members of the forum
```javascript
query {
  userForums(id: <userId>) {
    title,
    users {
      name,
      url
    }
  }
}
```

* ### post a message in the forum
```javascript
mutation {
  postMessage(userId: <userId>, forumId: <forumId>, text: <message>) {
    title
  }
}
```
