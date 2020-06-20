# Chat app

Simple chat application using GraphQL + NodeJS + apollo server



### Create User
mutation {
  createUser(name:"test1",email:"test1@yopmail.com",url:"test1.jpg",password:"#512@") {
    name
    email
    url
  }
}

### Members in Forum
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

### Join Forum
mutation {
  joinForum(userId:2, forumId:1) {
    title
  }
}