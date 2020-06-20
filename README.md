# Chat app

Simple chat application using GraphQL + NodeJS + apollo server



### Create User
```javascript
mutation {
  createUser(name:"test2",email:"test2@yopmail.com",url:"test2.jpg",password:"#512@") {
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
query {
  user(id:3) {
    id
    name
    email
    url
    forums {
      id
      title
      description
    }
  }
}
```

* ### A user can create a new forum (and join it automatically)
```javascript
mutation {
  createForum(userId: 3, title: "test forum3", description: "test3 description", private: false){
    id
    title
  }
}
```

* ### A user can see the list of available forum and can join any
```javascript
query {
  forums {
    id
    title
    description
  }
}
```

* ### He can also join a forum if he knows the forum id
```javascript
mutation {
  joinForum(userId:3, forumId: 1) {
    title
  }
}
```

* ### see the list of previous messages, ordered by most recent. To be displayed in our client, a message should at least have a text, a sending time and name/picture of the sender
```javascript
query {
  messages(forumId:1) {
    text
    createdAt
    user {
      name
      url
    }
  }
}
```

* ### see the name and picture of the members of the forum
```javascript
query {
  forum(id:1) {
    id,
    title,
    description
    users {
      name,
      email,
      id,
      url
    }
  }
}
```

* ### post a message in the forum
```javascript
mutation {
  postMessage(userId: 3, forumId: 1, text: "this is test message") {
    text
  }
}
```

