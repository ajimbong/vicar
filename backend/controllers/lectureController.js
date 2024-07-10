const db = require("../models");
const Lecture = db.Lecture;

exports.getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.findAll();
    res.status(200).json(lectures);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getLectureById = async (req, res) => {
  try {
    const lecture = await Lecture.findByPk(req.params.id);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }
    res.status(200).json(lecture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createLecture = async (req, res) => {
  try {
    const { title, course_id, locked } = req.body;
    const lecture = await Lecture.create({ title, course_id, locked });
    res.status(201).json(lecture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.unlockLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByPk(req.params.id);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    lecture.locked = false;
    await lecture.save();
    res.status(200).json(lecture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateLecture = async (req, res, next) => {
  try {
    const lecture = await db.Lecture.findByPk(req.params.id);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    await lecture.update(req.body);
    res.status(200).json(lecture);
  } catch (error) {
    next(error);
  }
};

exports.deleteLecture = async (req, res, next) => {
  try {
    const lecture = await db.Lecture.findByPk(req.params.id);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    await lecture.destroy();
    res.status(200).json({ message: "Lecture deleted successfully" });
  } catch (error) {
    next(error);
  }
};
