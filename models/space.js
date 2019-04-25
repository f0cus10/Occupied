module.exports = (sequelize, DataTypes) => {
  const Space = sequelize.define('space', {
    name: {
      type: DataTypes.STRING,
      validate: {
        //Letters and Numbers only
        isAlpha: {
          args: true,
          msg: "The name can only contain letters and numbers",
        },
        //Cannot be empty string
        notEmpty: {
          args: true,
          msg: "The name cannot be empty",
        }
      },
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
      defaultValue: false,
    },

    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: ""
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