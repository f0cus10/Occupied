module.exports = (sequelize, DataTypes) => {
  const Space = sequelize.define('space', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        allowNull: false,
      }
    },

    spaceNumber: {
      type: DataTypes.STRING,
      unique: false,
      validate: {
        notEmpty: true,
        allowNull: false,
      }
    },

    occupied: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {
    timestamps: false
  });

  Space.associate = (models) => {
    Space.belongsTo(models.Blueprint, {
      foreignKey: 'blueprintId',
    });
    Space.hasOne(models.User, {
      constraints: false
    });
  };

  return Space;
}