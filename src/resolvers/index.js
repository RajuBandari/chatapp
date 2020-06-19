const resolvers = {
  Query: {
      async user (root, { id }, { models }) {
        return models.User.findById(id)
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
      }
  }
}


module.exports = resolvers;
