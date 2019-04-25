'use strict';
module.exports = (sequelize, DataTypes) => {
  const Space = sequelize.define('space', {
    space_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
      validate: {
        isUUID:{
          args: 1,
          msg: "Must be a valid UUIDv1",
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        //Cannot be empty string
        notEmpty: {
          args: true,
          msg: "The name cannot be empty",
        }
      },
    },

    description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    //TODO: Add more depth to category
    category: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    occupied: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        isUrl: {
          args: true,
          msg: "Must be a valid URL",
        }
      }
    }
  }, {
    timestamps: false
  });

  Space.associate = (models) => {
    // space can only belong to one blueprint through blueprintId
    Space.belongsTo(models.Blueprint, {
      foreignKey: 'blueprintId',
    });
    // current user that occupies space
    Space.belongsTo(models.User);
  };

  return Space;
}
