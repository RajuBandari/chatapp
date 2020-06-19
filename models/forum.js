'use strict';
module.exports = (sequelize, DataTypes) => {
  const Forum = sequelize.define('Forum', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    private: DataTypes.BOOLEAN
  }, {});
  Forum.associate = function(models) {
    Forum.belongsToMany(models.User, {
      through: 'UserForum',
      as: 'users',
      foreignKey: 'forumId',
      otherKey: 'userId'
    });
  };
  return Forum;
};