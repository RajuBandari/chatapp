const resolvers = {
  Query: {
      async user (root, { id }, { models }) {
        return models.User.findByPk(id)
      },

      async forum (root, { id }, { models }) {
        return models.Forum.findByPk(id)
      },

      async forums(root, {}, { models }) {
        return models.Forum.findAll()
      }
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
          await models.UserForum.create( {
            userId,
            forumId: forum.id
          },{ returning: true });

          return forum;
      },

      async joinForum(root, { userId, forumId }, { models }) {
        await models.UserForum.create( {
          userId,
          forumId
        });
        return models.Forum.findByPk(forumId)
      }
  }
}


module.exports = resolvers;
