const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: Int!
        name: String!
        email: String!
        url: String!
        forums: [Forum!]!
    }

    type Forum {
        id: Int!
        title: String!,
        description: String!
        private: Boolean!
        users: [User!]!
    }

    type UserForum {
        action: String!
        text: String!
        createdAt: String!
        user: User!
    }


    type Query {
        user(id: Int!): User
        forum(id: Int!): Forum
        forums: [Forum!]!
        messages(forumId: Int!): [UserForum!]!
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!, url: String!): User!
        createForum(userId: ID, title: String!, description: String!, private: Boolean!): Forum!
        joinForum(userId: ID, forumId: ID): Forum!
        postMessage(userId: ID, forumId: ID, text: String!): UserForum!
    }
`;


module.exports = typeDefs;