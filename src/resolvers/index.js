const {
  AuthenticationError,
  UserInputError,
  ForbiddenError
} = require('apollo-server-express');

const User = require('./User');
const Forum = require('./Forum');

// data
const users = {}; 
const forums = {};

const resolvers = {
  Query: {

    getUser: (root, { id }) => {
      return new User(id, users[id]);
    },

    userForums: (root, { id }) => {
      return Object.values(forums)
        .filter(forum => forum.users.every(() => forum.users.includes(users[id])));
    },

    availableForums: (root, { id }) => {
      return Object.values(forums)
        .filter(forum => forum.users.every(() => !forum.users.includes(users[id])));
    },

    getForum: (root, { id, userId }) => {
      const forum = forums[id];
      if(!forum.users.includes(users[userId])) {
        throw new ForbiddenError('Not Allowed');
      }
      const messages = forum.messages.sort(function(a,b){
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      return {
        messages,
        ...forum
      }
    }
  },

  Mutation: {

    createUser: (root, { user }) => {
      const id = require('crypto').randomBytes(10).toString('hex');
      users[id] = user;
      return new User(id, user);
    },

    createForum: (root, { forum }) => {
      const user = users[forum.userId];
      if(!user) {
        throw new AuthenticationError('User not found');
      }
      const id = require('crypto').randomBytes(10).toString('hex');
      const newForum = new Forum(id, forum);
      newForum.users.push(user);
      forums[id] = newForum;
      return newForum;
    },

    joinForum: (root, { userId, forumId }) => {
      if(!users[userId]) {
        throw new AuthenticationError('User not found');
      }
      const forum = forums[forumId];
      forum.users.push(users[userId]);
      forums[forumId] = forum;
      return forum;
    },

    postMessage: (root, { userId, forumId, text }) => {
      const forum = forums[forumId];
      const user = users[userId];
      if(!forum.users.includes(user)) {
        throw new ForbiddenError('Not Allowed');
      }
      forum.messages.push({
        text,
        user,
        createdAt: Date.now()
      })
      forums[forumId] = forum;
      return forum;
    }
  }
}
 
module.exports = resolvers;