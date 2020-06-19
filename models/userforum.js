'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserForum = sequelize.define('UserForum', {
    userId: DataTypes.UUID,
    forumId: DataTypes.UUID
  }, {});
  UserForum.associate = function(models) {
    // associations can be defined here
  };
  return UserForum;
};