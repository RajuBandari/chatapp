# PART-2

## Specs
* ### When a user creates a forum, he can mark it as private. He will automatically be the admin of this forum.

```javascript
mutation {
  createForum(userId: 3, title: "test forum3", description: "test3 description", private: true){
    id
    title
  }
}
```

* ### When a forum is private, no-one can see it in the list of available forums.