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
      },

      async userForums(root, {id}, { models }) {

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
            forumId: forum.id,
            action: 'CREATE'
          },{ returning: true });

          return forum;
      },

      async joinForum(root, { userId, forumId }, { models }) {
        await models.UserForum.create( {
          userId,
          forumId
        });
        return models.Forum.findByPk(forumId)
      },

      async postMessage(root, { userId, forumId, text }, { models }) {
        return models.UserForum.create( {
          userId,
          forumId,
          text,
          action: 'MESSAGE'
        });
      }
  }
}


module.exports = resolvers;
