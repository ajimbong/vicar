const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

// Import models
db.Course = require("./course")(sequelize, Sequelize);
db.Lecture = require("./lecture")(sequelize, Sequelize);
db.Asset = require("./asset")(sequelize, Sequelize);
db.Lecturer = require("./lecturer")(sequelize, Sequelize);
db.Student = require("./student")(sequelize, Sequelize);
db.StudentEnrollment = require("./studentEnrollment")(sequelize, Sequelize);

// Define associations
db.Course.belongsTo(db.Lecturer, { foreignKey: "lecturer_id" });
db.Lecture.belongsTo(db.Course, { foreignKey: "course_id" });
db.Asset.belongsTo(db.Lecture, { foreignKey: "lecture_id" });
db.StudentEnrollment.belongsTo(db.Student, { foreignKey: "student_id" });
db.StudentEnrollment.belongsTo(db.Course, { foreignKey: "course_id" });
db.Course.hasMany(db.StudentEnrollment, { foreignKey: "course_id" });
db.Student.hasMany(db.StudentEnrollment, { foreignKey: "student_id" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
