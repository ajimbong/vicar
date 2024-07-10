module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define("Asset", {
    URL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Asset;
};
