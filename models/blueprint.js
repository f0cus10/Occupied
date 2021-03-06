'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blueprint = sequelize.define('blueprint', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "The name of the blueprint cannot be empty",
        }
      }
    },

    description: {
      type: DataTypes.STRING,
      defaultValue: "this is a place",
      allowNull: true,
    },

    address: {
      type: DataTypes.STRING,
      defaultValue: "123 Nothing Avenue",
      validate: {
        notEmpty: {
          args: true,
          msg: "The address field cannot be empty",
        }
      }
    },

    category: {
      type: DataTypes.STRING,
      defaultValue: "Place",
      validate: {
        //TODO: Provide isIn validation for dropdown
        notEmpty: {
          args: true,
          msg: "A category must be selected"
        }
      }
    },

    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: "https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image",
      validate: {
        isUrl: {
          args: true,
          msg: "The URL must be valid"
        }
      }
    },

    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: false
  });

  Blueprint.associate = (models) => {
    // Blueprint can have many Spaces. One-To-Many associations.
    Blueprint.hasMany(models.Space);
    Blueprint.hasMany(models.Visit);
    //A user can be part of many blueprints
    Blueprint.belongsToMany(models.User, {
      through    : 'member',
      foreignKey : 'blueprintId'
    });
    // this is the owner of the blueprint. this will create userId column in blueprint table.
    Blueprint.belongsTo(models.User);
  };

  return Blueprint;
};
