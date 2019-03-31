module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
  });

  User.associate = (models) => {
    //A user can be part of many blueprints
    User.belongsToMany(models.Blueprint, {
      through: 'member',
      foreignKey: 'memberId',
    })
    User.hasMany(models.Blueprint)
  };

  return User;
}