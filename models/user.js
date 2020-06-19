'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Forum, {
      through: 'UserForum',
      as: 'forums',
      foreignKey: 'userId',
      otherKey: 'forumId'
    });
  };
  return User;
};