# Chat app

Simple chat application using GraphQL + NodeJS + apollo server



### Create User
```javascript
mutation {
  createUser(name:"test1",email:"test1@yopmail.com",url:"test1.jpg",password:"#512@") {
    name
    email
    url
  }
}
```

### Create Forum
```javascript
mutation {
  createForum(userId: 1, title: "test forum2", description: "test2 description", private: false){
    title
  }
}
```

### Members in Forum
```javascript
query {
  forums {
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

### Join Forum
```javascript
mutation {
  joinForum(userId:2, forumId:1) {
    title
  }
}
```

## Specs

* ### A user can see the list of forums he has joined.
```javascript
query {
  user(id:1) {
    id,
    name,
    email,
    url,
    forums {
      title,
      description
    }
  }
}
```

### Forum(Id) details
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

