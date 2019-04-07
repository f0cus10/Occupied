module.exports = (sequelize, DataTypes) => {
  const Member =  sequelize.define('member', {
    occupied: DataTypes.string
  })

  return Member;
}