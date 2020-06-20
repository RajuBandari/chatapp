'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserForum = sequelize.define('UserForum', {
    userId: DataTypes.UUID,
    forumId: DataTypes.UUID,
    action: DataTypes.STRING,
    text: DataTypes.STRING
  }, {});
  UserForum.associate = function(models) {
    UserForum.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
    UserForum.belongsTo(models.Forum, {foreignKey: 'forumId', as: 'forum'})
  };
  return UserForum;
};