import express from "express";

const router = express.Router();

// Fake IoT update
router.post("/update", async (req, res) => {
  try {
    const data = req.body;
//temp
    // If single object, convert to array
    const bins = Array.isArray(data) ? data : [data];

    for (const bin of bins) {
      const { bin_id, level } = bin;

      if (!bin_id || level === undefined) {
        return res.status(400).json({
          error: "Each bin must have bin_id and level"
        });
      }

      await Bin.findOneAndUpdate(
        { bin_id },
        { level },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: `${bins.length} bin(s) updated successfully`
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;

