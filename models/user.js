module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true
      }
    },

    description: {
      type: DataTypes.STRING
    },

    usageTime: {
      type: DataTypes.FLOAT,
      defaultValue: 0.00
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
    },

    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW'),
    },

  });

  User.associate = (models) => {
    //A user can be part of many blueprints
    User.belongsToMany(models.Blueprint, {
      through    : 'member',
      foreignKey : 'userId'
    })
    User.hasMany(models.Blueprint);
  };

  return User;
}