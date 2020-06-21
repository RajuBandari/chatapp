const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID
        name: String!
        email: String!
        url: String!
    }

    type Forum {
        id: ID
        title: String!,
        description: String!
        isPrivate: Boolean!
        admin: User!
        users: [User!]
        messages: [Message!]
    }

    type Message {
        text: String!
        createdAt: String!
        user: User!
    }

    type Query {
        getUser(id: ID): User
        getForum(id: ID, userId: ID): Forum
        userForums(id: ID): [Forum]
        availableForums(id: ID): [Forum]
    }

    input UserInput {
        id: ID
        name: String!
        email: String!
        url: String!
    }

    input ForumInput {
        id: ID
        title: String!
        description: String!
        userId: ID!,
        isPrivate: Boolean,
    }

    type Mutation {
        createUser(user: UserInput!): User!
        createForum(forum: ForumInput!): Forum!
        joinForum(userId: ID!, forumId: ID!): Forum!
        postMessage(userId: ID! forumId: ID!, text: String!): Forum!
    }
`;


module.exports = typeDefs;