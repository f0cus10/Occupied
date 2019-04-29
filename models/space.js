module.exports = (sequelize, DataTypes) => {
  const Space = sequelize.define(
    "space",
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
          // allowNull: false,
        }
      },

      description: {
        type: DataTypes.STRING,
        defaultValue: ""
      },

      category: {
        type: DataTypes.STRING,
        defaultValue: ""
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
