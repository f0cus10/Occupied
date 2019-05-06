module.exports = (sequelize, DataTypes) => {
  const Visit = sequelize.define('visit', {
    from: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true
      }
    },
    to: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true
      }
    }
  }, {
    timestamps: false
  });

  Visit.associate = (models) => {
    Visit.belongsTo(models.Blueprint, {
      foreignKey: "blueprintId"
    });
    Visit.belongsTo(models.Space, {
      foreignKey: "spaceId"
    });
    Visit.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };

  return Visit;
}