const db = require("../config/db");


/* =========================================
   CREATE REQUEST
   PUBLIC CONTACT FORM
========================================= */

exports.createRequest = async (req, res) => {
  try {
    const {
      name,
      company,
      phone,
      email,
      system_type,
      models,
    } = req.body;


    if (
      !name ||
      !company ||
      !phone ||
      !email
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Нэр, компани, утас, имэйл шаардлагатай.",
      });
    }


    const selectedModels =
      Array.isArray(models)
        ? models
        : [];


    const [result] =
      await db.query(
        `
        INSERT INTO requests (
          name,
          company,
          phone,
          email,
          system_type,
          models,
          status
        )

        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          name.trim(),
          company.trim(),
          phone.trim(),
          email.trim(),
          system_type || null,
          JSON.stringify(selectedModels),
          "new",
        ]
      );


    res.status(201).json({
      success: true,

      message:
        "Таны хүсэлт амжилттай илгээгдлээ.",

      request: {
        id: result.insertId,
        name,
        company,
        phone,
        email,
        system_type,
        models: selectedModels,
        status: "new",
      },
    });

  } catch (error) {
    console.error(
      "Create request error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Хүсэлт илгээхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};


/* =========================================
   GET ALL REQUESTS
========================================= */

exports.getRequests = async (req, res) => {
  try {

    const [rows] =
      await db.query(`
        SELECT
          id,
          name,
          company,
          phone,
          email,
          system_type,
          models,
          status,
          created_at,
          updated_at

        FROM requests

        ORDER BY created_at DESC
      `);


    const requests =
      rows.map((item) => {

        let models = [];

        try {
          models =
            typeof item.models === "string"
              ? JSON.parse(item.models)
              : item.models || [];
        } catch {
          models = [];
        }


        return {
          ...item,
          models,
        };
      });


    res.json({
      success: true,
      requests,
    });

  } catch (error) {

    console.error(
      "Get requests error:",
      error
    );


    res.status(500).json({
      success: false,
      message:
        "Хүсэлтүүдийг авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};


/* =========================================
   GET ONE REQUEST + NOTES
========================================= */

exports.getRequest = async (req, res) => {

  try {

    const { id } = req.params;


    const [rows] =
      await db.query(
        `
        SELECT *
        FROM requests
        WHERE id = ?
        LIMIT 1
        `,
        [id]
      );


    if (rows.length === 0) {

      return res.status(404).json({
        success: false,
        message:
          "Хүсэлт олдсонгүй.",
      });

    }


    const request = rows[0];


    try {

      request.models =
        typeof request.models === "string"
          ? JSON.parse(request.models)
          : request.models || [];

    } catch {

      request.models = [];

    }


    const [notes] =
      await db.query(
        `
        SELECT
          id,
          note,
          created_at

        FROM request_notes

        WHERE request_id = ?

        ORDER BY created_at DESC
        `,
        [id]
      );


    res.json({
      success: true,
      request: {
        ...request,
        notes,
      },
    });

  } catch (error) {

    console.error(
      "Get request error:",
      error
    );


    res.status(500).json({
      success: false,
      message:
        "Хүсэлтийн мэдээлэл авахад алдаа гарлаа.",
      error: error.message,
    });

  }

};


/* =========================================
   UPDATE STATUS
========================================= */

exports.updateRequestStatus =
  async (req, res) => {

    try {

      const { id } = req.params;

      const {
        status,
      } = req.body;


      const allowedStatuses = [
        "new",
        "contacted",
        "contract",
        "active",
      ];


      if (
        !allowedStatuses.includes(status)
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Буруу статус байна.",
        });

      }


      const [result] =
        await db.query(
          `
          UPDATE requests

          SET status = ?

          WHERE id = ?
          `,
          [
            status,
            id,
          ]
        );


      if (
        result.affectedRows === 0
      ) {

        return res.status(404).json({
          success: false,
          message:
            "Хүсэлт олдсонгүй.",
        });

      }


      res.json({
        success: true,
        message:
          "Статус шинэчлэгдлээ.",
      });

    } catch (error) {

      console.error(
        "Update request status:",
        error
      );


      res.status(500).json({
        success: false,
        message:
          "Статус шинэчлэхэд алдаа гарлаа.",
        error: error.message,
      });

    }

  };


/* =========================================
   ADD NOTE
========================================= */

exports.addNote =
  async (req, res) => {

    try {

      const { id } = req.params;

      const {
        note,
      } = req.body;


      if (
        !note ||
        !note.trim()
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Тэмдэглэл хоосон байна.",
        });

      }


      const [requestRows] =
        await db.query(
          `
          SELECT id
          FROM requests
          WHERE id = ?
          LIMIT 1
          `,
          [id]
        );


      if (
        requestRows.length === 0
      ) {

        return res.status(404).json({
          success: false,
          message:
            "Хүсэлт олдсонгүй.",
        });

      }


      const [result] =
        await db.query(
          `
          INSERT INTO request_notes (
            request_id,
            note
          )

          VALUES (?, ?)
          `,
          [
            id,
            note.trim(),
          ]
        );


      res.status(201).json({
        success: true,

        message:
          "Тэмдэглэл нэмэгдлээ.",

        note: {
          id:
            result.insertId,

          request_id:
            Number(id),

          note:
            note.trim(),
        },
      });

    } catch (error) {

      console.error(
        "Add request note:",
        error
      );


      res.status(500).json({
        success: false,
        message:
          "Тэмдэглэл нэмэхэд алдаа гарлаа.",
        error: error.message,
      });

    }

  };