'use strict';
module.exports = (sequelize, DataTypes) => {
  const Space = sequelize.define('space', {
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

    occupiedStart: {
      type: DataTypes.DATE,
    },

    occupied: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: ""
    }
    },
    {
      timestamps: false
    }
  );

  Space.associate = models => {
    // space can only belong to one blueprint through blueprintId
    Space.belongsTo(models.Blueprint, {
      foreignKey: "blueprintId"
    });
    // current user that occupies space
    Space.belongsTo(models.User);
  };

  return Space;
};
