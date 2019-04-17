module.exports = (sequelize, DataTypes) => {
  const Blueprint = sequelize.define('blueprint', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },

    address: {
      type: DataTypes.STRING,
      defaultValue: ''
    },

    description: {
      type: DataTypes.STRING,
      defaultValue: "this is a place",
    },

    address: {
      type: DataTypes.STRING,
      defaultValue: "123 Nothing Avenue",
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
    // Blueprint can have many Spaces. One-To-Many associations.
    Blueprint.hasMany(models.Space);
    //A user can be part of many blueprints
    Blueprint.belongsToMany(models.User, {
      through    : 'member',
      foreignKey : 'blueprintId'
    });
    // this is the owner of the blueprint. this will create userId column in blueprint table.
    Blueprint.belongsTo(models.User);
  };

  return Blueprint;
};
