module.exports = (sequelize, DataTypes) => {
  const Blueprint = sequelize.define('blueprint', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },

    description: {
      type: DataTypes.STRING,
      defaultValue: "this is a place",
    },

    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: "https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image"
    },

    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: false
  });

  Blueprint.associate = (models) => {
    //A user can be part of many blueprints
    Blueprint.belongsToMany(models.User, {
      as: "Members",
      through: 'member',
      foreignKey: 'memberId',
    });
    Blueprint.belongsTo(models.User, {
      foreignKey: 'ownerID', 
    });
  };

  return Blueprint;
};
