'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserForum = sequelize.define('UserForum', {
    userId: DataTypes.UUID,
    forumId: DataTypes.UUID,
    action: DataTypes.STRING,
    text: DataTypes.STRING
  }, {});
  UserForum.associate = function(models) {
    // associations can be defined here
  };
  return UserForum;
};