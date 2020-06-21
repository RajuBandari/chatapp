* ### When a user creates a forum, he can mark it as private. He will automatically be the admin of this forum.
``javascript
mutation {
  createForum(
    forum: {
      title: "test1"
      description: "test1 description"
      isPrivate: true
      userId: <userId>
    }
  ) {
    id
  }
}
```