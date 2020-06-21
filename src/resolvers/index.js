const {
  ForbiddenError
} = require('apollo-server-express');

const User = require('./User');
const Forum = require('./Forum');

const users = {}; // users data
const forums = {}; // forums data

const resolvers = {
  Query: {

    getUser: (root, { id }) => {
      return new User(id, users[id]);
    },

    userForums: (root, { id }) => {
      return Object.values(forums)
        .filter(forum => forum.users.every(() => forum.users.includes(id)));
    },

    availableForums: (root, { id }) => {
      return Object.values(forums)
        .filter(forum => forum.users.every(() => !forum.users.includes(id)));
    },

    getForum: (root, { id, userId }) => {
      const forum = forums[id];
      if(!forum.users.includes(userId)) {
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
      const id = require('crypto').randomBytes(10).toString('hex');
      const newForum = new Forum(id, forum);
      forums[id] = newForum;
      return newForum;
    },

    joinForum: (root, { userId, forumId }) => {
      const forum = forums[forumId];
      forum.users.push(userId);
      forums[forumId] = forum;
      return forum;
    },

    postMessage: (root, { userId, forumId, text }) => {
      const forum = forums[forumId];
      const user = users[userId];
      if(forum.users.includes(userId)) {
        forum.messages.push({
          text,
          user,
          createdAt: Date.now()
        })
        forums[forumId] = forum;
        return forum;
      } else {
        throw new ForbiddenError('Not Allowed');
      }
    }
  }
}
 
module.exports = resolvers;