'use strict';
module.exports = (sequelize, DataTypes) => {
  const member = sequelize.define('member', {
    name: {
        type:DataTypes.STRING,
        allowNull: false
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type:DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type:DataTypes.STRING
    }
  }, {});
  member.associate = function(models) {
    // associations can be defined here
  };
  return member;
};
