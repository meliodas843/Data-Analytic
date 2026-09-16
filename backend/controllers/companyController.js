const db =
  require("../config/db");

exports.getCompanies =
  async (req, res) => {
    try {
      const [rows] =
        await db.query(`
          SELECT
            c.id,
            c.name,
            c.domain,
            c.email,
            c.phone,
            c.registration_number,
            c.address,
            c.employee_count,
            c.source_system,
            c.status,
            c.sync_status,
            c.sync_time,
            c.logo,
            c.color,
            c.created_by,
            c.created_at,
            COUNT(u.id) AS users
          FROM companies c
          LEFT JOIN users u
            ON u.company_id = c.id
          GROUP BY
            c.id,
            c.name,
            c.domain,
            c.email,
            c.phone,
            c.registration_number,
            c.address,
            c.employee_count,
            c.source_system,
            c.status,
            c.sync_status,
            c.sync_time,
            c.logo,
            c.color,
            c.created_by,
            c.created_at
          ORDER BY c.created_at DESC
        `);

      return res.json({
        success: true,
        companies: rows,
      });
    } catch (error) {
      console.error(
        "Get companies error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Компаниудыг авахад алдаа гарлаа.",
          error:
            error.message,
        });
    }
  };

exports.getCompany =
  async (req, res) => {
    try {
      const {
        id,
      } =
        req.params;

      const [rows] =
        await db.query(
          `
          SELECT
            c.id,
            c.name,
            c.domain,
            c.email,
            c.phone,
            c.registration_number,
            c.address,
            c.employee_count,
            c.source_system,
            c.status,
            c.sync_status,
            c.sync_time,
            c.logo,
            c.color,
            c.created_by,
            c.created_at,
            COUNT(u.id) AS users
          FROM companies c
          LEFT JOIN users u
            ON u.company_id = c.id
          WHERE c.id = ?
          GROUP BY
            c.id,
            c.name,
            c.domain,
            c.email,
            c.phone,
            c.registration_number,
            c.address,
            c.employee_count,
            c.source_system,
            c.status,
            c.sync_status,
            c.sync_time,
            c.logo,
            c.color,
            c.created_by,
            c.created_at
          LIMIT 1
          `,
          [
            id,
          ]
        );

      if (
        rows.length ===
        0
      ) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Компани олдсонгүй.",
          });
      }

      return res.json({
        success: true,
        company:
          rows[0],
      });
    } catch (error) {
      console.error(
        "Get company error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Компани авахад алдаа гарлаа.",
          error:
            error.message,
        });
    }
  };

exports.registerCompany =
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        domain,
        registration_number,
        address,
        employee_count,
        source_system,
        status,
        color,
        logo,
      } =
        req.body;

      if (
        !name ||
        !email
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Компанийн нэр болон имэйл шаардлагатай.",
          });
      }

      const normalizedEmail =
        email
          .trim()
          .toLowerCase();

      const [existing] =
        await db.query(
          `
          SELECT id
          FROM companies
          WHERE email = ?
          LIMIT 1
          `,
          [
            normalizedEmail,
          ]
        );

      if (
        existing.length >
        0
      ) {
        return res
          .status(409)
          .json({
            success: false,
            message:
              "Энэ имэйлээр компани бүртгэгдсэн байна.",
          });
      }

      const finalStatus =
        [
          "active",
          "inactive",
          "pending",
        ].includes(
          status
        )
          ? status
          : "pending";

      const finalLogo =
        logo ||
        name
          .trim()
          .charAt(0)
          .toUpperCase();

      const finalColor =
        color ||
        "#16A34A";

      const [result] =
        await db.query(
          `
          INSERT INTO companies (
            name,
            domain,
            email,
            phone,
            registration_number,
            address,
            employee_count,
            source_system,
            status,
            sync_status,
            sync_time,
            logo,
            color
          )
          VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
          )
          `,
          [
            name.trim(),
            domain ||
              null,
            normalizedEmail,
            phone ||
              null,
            registration_number ||
              null,
            address ||
              null,
            employee_count ||
              null,
            source_system ||
              null,
            finalStatus,
            "pending",
            null,
            finalLogo,
            finalColor,
          ]
        );

      return res
        .status(201)
        .json({
          success: true,
          message:
            "Компани амжилттай бүртгэгдлээ.",
          company: {
            id:
              result.insertId,
            name:
              name.trim(),
            domain:
              domain ||
              null,
            email:
              normalizedEmail,
            phone:
              phone ||
              null,
            status:
              finalStatus,
            sync_status:
              "pending",
            sync_time:
              null,
            logo:
              finalLogo,
            color:
              finalColor,
          },
        });
    } catch (error) {
      console.error(
        "Register company error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Компани бүртгэхэд алдаа гарлаа.",
          error:
            error.message,
        });
    }
  };

exports.updateCompany =
  async (req, res) => {
    try {
      const {
        id,
      } =
        req.params;

      const {
        name,
        domain,
        email,
        phone,
        registration_number,
        address,
        employee_count,
        source_system,
        status,
        sync_status,
        sync_time,
        color,
        logo,
      } =
        req.body;

      const [
        existingRows,
      ] =
        await db.query(
          `
          SELECT *
          FROM companies
          WHERE id = ?
          LIMIT 1
          `,
          [
            id,
          ]
        );

      if (
        existingRows.length ===
        0
      ) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Компани олдсонгүй.",
          });
      }

      const existing =
        existingRows[0];

      const finalName =
        name ??
        existing.name;

      const finalDomain =
        domain ??
        existing.domain;

      const finalEmail =
        String(
          email ??
            existing.email
        )
          .trim()
          .toLowerCase();

      const finalPhone =
        phone ??
        existing.phone;

      const finalRegistrationNumber =
        registration_number ??
        existing.registration_number;

      const finalAddress =
        address ??
        existing.address;

      const finalEmployeeCount =
        employee_count ??
        existing.employee_count;

      const finalSourceSystem =
        source_system ??
        existing.source_system;

      const finalStatus =
        status ??
        existing.status;

      const finalSyncStatus =
        sync_status ??
        existing.sync_status;

      const finalSyncTime =
        sync_time ===
        undefined
          ? existing.sync_time
          : sync_time ||
            null;

      const finalColor =
        color ??
        existing.color ??
        "#16A34A";

      const finalLogo =
        logo ===
        undefined
          ? existing.logo
          : logo ||
            finalName
              .trim()
              .charAt(0)
              .toUpperCase();

      await db.query(
        `
        UPDATE companies
        SET
          name = ?,
          domain = ?,
          email = ?,
          phone = ?,
          registration_number = ?,
          address = ?,
          employee_count = ?,
          source_system = ?,
          status = ?,
          sync_status = ?,
          sync_time = ?,
          logo = ?,
          color = ?
        WHERE id = ?
        `,
        [
          finalName,
          finalDomain ||
            null,
          finalEmail,
          finalPhone ||
            null,
          finalRegistrationNumber ||
            null,
          finalAddress ||
            null,
          finalEmployeeCount ||
            null,
          finalSourceSystem ||
            null,
          finalStatus,
          finalSyncStatus,
          finalSyncTime,
          finalLogo,
          finalColor,
          id,
        ]
      );

      if (
        finalStatus ===
        "inactive"
      ) {
        await db.query(
          `
          UPDATE users
          SET status = 'inactive'
          WHERE company_id = ?
            AND role != 'super_admin'
          `,
          [
            id,
          ]
        );
      }

      if (
        finalStatus ===
        "active"
      ) {
        await db.query(
          `
          UPDATE users
          SET status = 'active'
          WHERE company_id = ?
            AND role != 'super_admin'
          `,
          [
            id,
          ]
        );
      }

      return res.json({
        success: true,
        message:
          "Компани шинэчлэгдлээ.",
      });
    } catch (error) {
      console.error(
        "Update company error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Компани шинэчлэхэд алдаа гарлаа.",
          error:
            error.message,
        });
    }
  };

exports.deleteCompany =
  async (req, res) => {
    const connection =
      await db.getConnection();

    try {
      const {
        id,
      } =
        req.params;

      await connection.beginTransaction();

      const [rows] =
        await connection.query(
          `
          SELECT id
          FROM companies
          WHERE id = ?
          LIMIT 1
          `,
          [
            id,
          ]
        );

      if (
        rows.length ===
        0
      ) {
        await connection.rollback();

        return res
          .status(404)
          .json({
            success: false,
            message:
              "Компани олдсонгүй.",
          });
      }

      await connection.query(
        `
        UPDATE users
        SET company_id = NULL
        WHERE company_id = ?
        `,
        [
          id,
        ]
      );

      await connection.query(
        `
        DELETE FROM companies
        WHERE id = ?
        `,
        [
          id,
        ]
      );

      await connection.commit();

      return res.json({
        success: true,
        message:
          "Компани устгагдлаа.",
      });
    } catch (error) {
      await connection.rollback();

      console.error(
        "Delete company error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Компани устгахад алдаа гарлаа.",
          error:
            error.message,
        });
    } finally {
      connection.release();
    }
  };