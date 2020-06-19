const resolvers = {
  Query: {
      async user (root, { id }, { models }) {
        return models.User.findByPk(id)
      },

      async forum (root, { id }, { models }) {
        return models.Forum.findByPk(id)
      },
    },

    Mutation: {
      async createUser (root, { name, email, password, url }, { models }) {
          return models.User.create({
              name,
              email,
              password,
              url
            })
      },

      async createForum (root, { userId, title, description, private}, { models }) {
        const forum = await models.Forum.create({
            title,
            description,
            private
          });
          const userForum = await models.UserForum.create( {
            userId: userId,
            forumId: forum.id
          },{ returning: true });

          return forum;
      }
  }
}


module.exports = resolvers;
