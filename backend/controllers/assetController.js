const db = require("../models");
const Asset = db.Asset;

exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res.status(200).json(assets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    res.status(200).json(asset);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createAsset = async (req, res) => {
  try {
    const { URL, lecture_id } = req.body;
    const asset = await Asset.create({ URL, lecture_id });
    res.status(201).json(asset);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAsset = async (req, res, next) => {
  try {
    const asset = await db.Asset.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    await asset.update(req.body);
    res.status(200).json(asset);
  } catch (error) {
    next(error);
  }
};

exports.deleteAsset = async (req, res, next) => {
  try {
    const asset = await db.Asset.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    await asset.destroy();
    res.status(200).json({ message: "Asset deleted successfully" });
  } catch (error) {
    next(error);
  }
};

