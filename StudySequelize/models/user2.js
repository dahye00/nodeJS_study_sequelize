'use strict';
module.exports = (sequelize, DataTypes) => {
  const user2 = sequelize.define('user2', {
    user_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name : {
        type: Sequelize.STRING,
        allowNull: false
    }
  }, {
      clssMethods: {
          associate : function(models) {
              // associations can be defined here
          }
      }
  });
  return user2;
};
