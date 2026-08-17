const db = require("../config/db");

exports.getHomeContent = async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT content
      FROM home_content
      WHERE section_key = ?
      LIMIT 1
      `,
      ["home"]
    );

    if (rows.length === 0) {
      return res.json({
        success: true,
        data: null,
      });
    }

    let content = rows[0].content;

    if (typeof content === "string") {
      content = JSON.parse(content);
    }

    res.json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error("GET HOME ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load home content",
    });
  }
};


// ==========================================
// SAVE HOME CONTENT
// ==========================================

exports.saveHomeContent = async (req, res) => {
  try {
    const content = req.body;

    await db.query(
      `
      INSERT INTO home_content (
        section_key,
        content
      )
      VALUES (?, ?)

      ON DUPLICATE KEY UPDATE
        content = VALUES(content)
      `,
      [
        "home",
        JSON.stringify(content),
      ]
    );

    res.json({
      success: true,
      message: "Home page saved successfully",
      data: content,
    });
  } catch (error) {
    console.error("SAVE HOME ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save home content",
    });
  }
};