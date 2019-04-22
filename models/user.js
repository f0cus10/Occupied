'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: "The username can only contain letters and numbers",
        },
        len: {
          args: [3,16],
          msg: "The username needs to be between 3 and 16 characters long",
        }
      },
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
        isEmail:{
          args: true,
          msg: "Invalid Email",
        }
      }
    },
    
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true
    },

    usageTime: {
      type: DataTypes.FLOAT,
      defaultValue: 0.00
    },

    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: ""
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
    },

    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW'),
    },

  },
  {
    freezeTableName: true,
    hooks: {
      beforeCreate:function(user) {
        user.password = bcrypt.hashSync(user.password, 10);
      }, 
      beforeBulkCreate:function(users) {
        users.map(u => {
          u.password = bcrypt.hashSync(u.password, 10);
          return u;
        })
      }
    }
  });

  User.prototype.validPassword = async function(password){
    return await bcrypt.compare(password, this.password);
  }

  User.associate = (models) => {
    // User can have many blueprints that they belong to. 
    User.hasMany(models.Blueprint);
    // A user can be part of many blueprints
    User.belongsToMany(models.Blueprint, {
      through    : 'member',
      foreignKey : 'userId'
    })
    User.hasOne(models.Space);
  };

  return User;
}