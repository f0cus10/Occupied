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
    // User can have many blueprints that they belong to. 
    User.hasMany(models.Blueprint);
    // A user can be part of many blueprints
    User.belongsToMany(models.Blueprint, {
      through    : 'member',
      foreignKey : 'userId'
    })
    User.hasOne(models.Space);
  };

  return User;
}