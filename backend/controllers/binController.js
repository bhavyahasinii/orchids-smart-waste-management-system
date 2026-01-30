const Bin = require('../models/Bin');

exports.getBins = async (req, res) => {
  try {
    const bins = await Bin.find();
    res.status(200).json({ success: true, data: bins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBin = async (req, res) => {
  try {
    const { bin_id, level } = req.body;

    let status = 'Empty';
    if (level >= 80) status = 'Full';
    else if (level >= 40) status = 'Half';

    const bin = await Bin.findOneAndUpdate(
      { bin_id },
      { level, status, lastUpdated: Date.now() },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, data: bin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
