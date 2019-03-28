module.exports = (sequelize, DataTypes) => {
  const Space = sequelize.define('space', {
    space_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
    },

    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        allowNull: false,
      }
    },

    space_number: {
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
  });

  Space.associate = (models) => {
    Space.belongsTo(models.Blueprint, {
      foreignKey: 'blueprintID',
    });

    Space.hasOne(models.User, {
      foreignKey: 'occupiedID',
    });
  };

  return Space;
}