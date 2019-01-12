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
        validate: {
            isEmail: true
        },
        primaryKey:true,
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
