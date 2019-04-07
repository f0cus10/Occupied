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

    category: {
      type: DataTypes.STRING,
      defaultValue: "Place"
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
      through    : 'member',
      foreignKey : 'blueprintId'
    });
    Blueprint.belongsTo(models.User);
  };

  return Blueprint;
};
