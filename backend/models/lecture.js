module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define("Lecture", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locked: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  return Lecture;
};
