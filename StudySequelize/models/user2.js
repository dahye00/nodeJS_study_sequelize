'use strict';
module.exports = (sequelize, DataTypes) => {
  const user2 = sequelize.define('user2', {
    user_id: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  user2.associate = function(models) {
    // associations can be defined here
  };
  return user2;
};