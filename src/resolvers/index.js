'use strict';

const fs = require('fs');
const path = require('path');  
const filePath = path.join(__dirname, '../data/fixtures.json');

const {
  AuthenticationError,
  UserInputError,
  ForbiddenError
} = require('apollo-server-express');

const User = require('./User');
const Forum = require('./Forum');

// data
let users = {}; 
let forums = {};

// loading fake data
fs.readFile(filePath, (err, data) => {
    if (err) throw err;
    const { usersData, forumsData } = JSON.parse(data);
    users = usersData;
    forums = forumsData
    return;
});

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

    getForum: (root, { id }) => {
      const forum = forums[id];
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
      if(!users[userId] || !forums[forumId]) {
        throw new UserInputError('Invalid input');
      }
      const forum = forums[forumId];
      forum.users.push(users[userId]);
      forums[forumId] = forum;
      return forum;
    },

    postMessage: (root, { userId, forumId, text }) => {
      if(!users[userId] || !forums[forumId]) {
        throw new UserInputError('Invalid input');
      }
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