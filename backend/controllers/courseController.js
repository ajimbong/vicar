const db = require("../models");
const Course = db.Course;

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { title, description, code, lecturer_id } = req.body;
    const course = await Course.create({
      title,
      description,
      code,
      lecturer_id,
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const course = await db.Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    await course.update(req.body);
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await db.Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    await course.destroy();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    next(error);
  }
};

