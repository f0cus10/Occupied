module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('schedule', {
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

  Schedule.associate = (models) => {
    Schedule.belongsTo(models.Blueprint);
  };

  return Schedule;
}