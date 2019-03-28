module.exports = (sequelize, DataTypes) => {
  const Blueprint = sequelize.define('blueprint', {
    blueprint_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
    },

    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    }
  });

  Blueprint.associate = (models) => {
    //A user can be part of many blueprints
    Blueprint.belongsToMany(models.User, {
      through: 'member',
      foreignKey: 'blueprintID',
    });

    Blueprint.belogsTo(models.User, {
      foreignKey: 'owner',
    });
  };

  return Blueprint;
}