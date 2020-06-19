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
      async createForum (root, { title, description, private}, { models }) {
        return models.Forum.create({
            title,
            description,
            private
          })
      }
  }
}


module.exports = resolvers;
