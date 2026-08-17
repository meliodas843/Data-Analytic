import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import "../styles/Setup.css";

const API_URL =
  "http://localhost:5000/api";

const detectionStages = [
  {
    title:
      "Дансны мод илрүүлэлт",
  },
  {
    title:
      "Харилцагчийн бүртгэл",
  },
  {
    title:
      "Борлуулалтын өгөгдөл",
  },
  {
    title:
      "Санхүүгийн бүтэц",
  },
  {
    title:
      "Барааны бүртгэл",
  },
  {
    title:
      "Мөнгөн гүйлгээ",
  },
];

function Setup() {
  const navigate =
    useNavigate();

  const token =
    localStorage.getItem(
      "token"
    );

  const [
    step,
    setStep,
  ] = useState(1);

  const [
    step3Screen,
    setStep3Screen,
  ] = useState(
    "detect"
  );

  const [
    step4Screen,
    setStep4Screen,
  ] = useState(
    "building"
  );

  const [
    connectionType,
    setConnectionType,
  ] = useState(
    "database"
  );

  const [
    connectionOk,
    setConnectionOk,
  ] = useState(false);

  const [
    connectionLoading,
    setConnectionLoading,
  ] = useState(false);

  const [
    detectionStage,
    setDetectionStage,
  ] = useState(0);

  const [
    detectionProgress,
    setDetectionProgress,
  ] = useState(0);

  const [
    buildProgress,
    setBuildProgress,
  ] = useState(0);

  const [
    openGroup,
    setOpenGroup,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const [
    company,
    setCompany,
  ] = useState({
    registrationNumber:
      "",
    address:
      "",
    employeeCount:
      "",
    system:
      "",
    logo:
      null,
  });

  const [
    databaseConnection,
    setDatabaseConnection,
  ] = useState({
    dbType:
      "mysql",
    host:
      "",
    port:
      "3306",
    database:
      "",
    username:
      "",
    password:
      "",
  });

  const [
    oneC,
    setOneC,
  ] = useState({
    host:
      "",
    database:
      "",
    username:
      "",
    password:
      "",
  });

  const [
    excelFile,
    setExcelFile,
  ] = useState(null);

  const [
    groups,
    setGroups,
  ] = useState([]);

  const [
    mappings,
    setMappings,
  ] = useState([]);

  const [
    metrics,
    setMetrics,
  ] = useState({
    tableCount:
      0,
    totalRows:
      0,
    incomeTotal:
      null,
    incomeSource:
      null,
  });

  const [
    dashboards,
    setDashboards,
  ] = useState([]);

  const [
    connectionInfo,
    setConnectionInfo,
  ] = useState(null);

  const headers =
    useMemo(
      () => ({
        "Content-Type":
          "application/json",
        Authorization:
          `Bearer ${token}`,
      }),
      [
        token,
      ]
    );

  useEffect(
    () => {
      if (!token) {
        navigate(
          "/login",
          {
            replace:
              true,
          }
        );
      }
    },
    [
      token,
      navigate,
    ]
  );

  useEffect(
    () => {
      if (
        step !== 3 ||
        step3Screen !==
          "detect"
      ) {
        return;
      }

      setDetectionStage(
        0
      );

      setDetectionProgress(
        0
      );

      let stage =
        0;

      const interval =
        setInterval(
          () => {
            stage +=
              1;

            const progress =
              Math.min(
                100,
                Math.round(
                  (
                    stage /
                    detectionStages.length
                  ) *
                    100
                )
              );

            setDetectionStage(
              stage
            );

            setDetectionProgress(
              progress
            );

            if (
              stage >=
              detectionStages.length
            ) {
              clearInterval(
                interval
              );

              setTimeout(
                () => {
                  setStep3Screen(
                    "tables"
                  );
                },
                650
              );
            }
          },
          650
        );

      return () =>
        clearInterval(
          interval
        );
    },
    [
      step,
      step3Screen,
    ]
  );

  useEffect(
    () => {
      if (
        step !== 4 ||
        step4Screen !==
          "building"
      ) {
        return;
      }

      setBuildProgress(
        0
      );

      let value =
        0;

      const interval =
        setInterval(
          () => {
            value +=
              5;

            if (
              value >=
              100
            ) {
              setBuildProgress(
                100
              );

              clearInterval(
                interval
              );

              setTimeout(
                () => {
                  setStep4Screen(
                    "complete"
                  );
                },
                700
              );

              return;
            }

            setBuildProgress(
              value
            );
          },
          140
        );

      return () =>
        clearInterval(
          interval
        );
    },
    [
      step,
      step4Screen,
    ]
  );

  const updateCompany = (
    key,
    value
  ) => {
    setCompany(
      (
        prev
      ) => ({
        ...prev,
        [key]:
          value,
      })
    );
  };

  const updateDatabaseConnection = (
    key,
    value
  ) => {
    setDatabaseConnection(
      (
        prev
      ) => ({
        ...prev,
        [key]:
          value,
      })
    );

    setConnectionOk(
      false
    );
  };

  const handleDatabaseTypeChange = (
    value
  ) => {
    let port =
      "";

    if (
      value ===
      "mysql"
    ) {
      port =
        "3306";
    }

    if (
      value ===
      "postgresql"
    ) {
      port =
        "5432";
    }

    if (
      value ===
      "mssql"
    ) {
      port =
        "1433";
    }

    setDatabaseConnection(
      (
        prev
      ) => ({
        ...prev,
        dbType:
          value,
        port,
      })
    );

    setConnectionOk(
      false
    );
  };

  const updateOneC = (
    key,
    value
  ) => {
    setOneC(
      (
        prev
      ) => ({
        ...prev,
        [key]:
          value,
      })
    );

    setConnectionOk(
      false
    );
  };

  const selectConnectionType = (
    value
  ) => {
    setConnectionType(
      value
    );

    setConnectionOk(
      false
    );

    setError(
      ""
    );
  };

  const applyDatabaseResult = (
    data
  ) => {
    const nextGroups =
      Array.isArray(
        data.groups
      )
        ? data.groups.map(
            (
              group
            ) => ({
              ...group,
              items:
                group.items.map(
                  (
                    item
                  ) => ({
                    ...item,
                    rows:
                      Number(
                        item.rows ||
                          0
                      ),
                    selected:
                      item.selected !==
                      false,
                    usage:
                      `${item.columns?.length || 0} багана`,
                  })
                ),
            })
          )
        : [];

    setGroups(
      nextGroups
    );

    if (
      nextGroups.length
    ) {
      setOpenGroup(
        nextGroups[0]
          .id
      );
    }

    setMappings(
      Array.isArray(
        data.mappings
      )
        ? data.mappings
        : []
    );

    setDashboards(
      Array.isArray(
        data.dashboards
      )
        ? data.dashboards
        : []
    );

    setMetrics({
      tableCount:
        Number(
          data.metrics
            ?.tableCount ||
            0
        ),
      totalRows:
        Number(
          data.metrics
            ?.totalRows ||
            0
        ),
      incomeTotal:
        data.metrics
          ?.incomeTotal ??
        null,
      incomeSource:
        data.metrics
          ?.incomeSource ??
        null,
    });

    setConnectionInfo(
      data.connection ||
        null
    );
  };

const fileToBase64 =
  (
    file
  ) =>
    new Promise(
      (
        resolve,
        reject
      ) => {
        if (!file) {
          resolve(null);
          return;
        }

        const reader =
          new FileReader();

        reader.onload =
          () =>
            resolve(
              reader.result
            );

        reader.onerror =
          () =>
            reject(
              new Error(
                "Лого уншихад алдаа гарлаа."
              )
            );

        reader.readAsDataURL(
          file
        );
      }
    );

const saveCompany =
  async () => {
    try {
      setError("");

      if (
        !company.registrationNumber.trim()
      ) {
        throw new Error(
          "Регистрийн дугаар оруулна уу."
        );
      }

      if (
        !company.address.trim()
      ) {
        throw new Error(
          "Компанийн хаяг оруулна уу."
        );
      }

      if (
        !company.employeeCount
      ) {
        throw new Error(
          "Ажилчдын тоо сонгоно уу."
        );
      }

      if (
        !company.system
      ) {
        throw new Error(
          "Ашиглаж буй системээ сонгоно уу."
        );
      }

      if (
        company.logo &&
        company.logo.size >
          2 * 1024 * 1024
      ) {
        throw new Error(
          "Лого 2MB-аас бага хэмжээтэй байна."
        );
      }

      const logo =
        company.logo
          ? await fileToBase64(
              company.logo
            )
          : null;

      const response =
        await fetch(
          `${API_URL}/onboarding/company`,
          {
            method:
              "POST",

            headers,

            body:
              JSON.stringify({
                registrationNumber:
                  company.registrationNumber,

                address:
                  company.address,

                employeeCount:
                  company.employeeCount,

                system:
                  company.system,

                logo,
              }),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok
      ) {
        throw new Error(
          data.message ||
            "Компанийн мэдээлэл хадгалж чадсангүй."
        );
      }

      const currentUser =
        JSON.parse(
          localStorage.getItem(
            "user"
          ) || "{}"
        );

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...currentUser,

          company_id:
            data.company?.id ||
            currentUser.company_id,
        })
      );

      setStep(2);
    } catch (
      err
    ) {
      setError(
        err.message
      );
    }
  };

  const testConnection =
    async () => {
      try {
        setConnectionLoading(
          true
        );

        setConnectionOk(
          false
        );

        setError(
          ""
        );

        if (
          connectionType ===
          "excel"
        ) {
          if (
            !excelFile
          ) {
            throw new Error(
              "Excel эсвэл CSV файл сонгоно уу."
            );
          }

          setConnectionOk(
            true
          );

          return;
        }

        let payload;

        if (
          connectionType ===
          "database"
        ) {
          if (
            !databaseConnection.dbType ||
            !databaseConnection.host.trim() ||
            !databaseConnection.port.trim() ||
            !databaseConnection.database.trim() ||
            !databaseConnection.username.trim() ||
            !databaseConnection.password
          ) {
            throw new Error(
              "Database холболтын мэдээллийг бүрэн оруулна уу."
            );
          }

          payload = {
            type:
              "database",
            dbType:
              databaseConnection.dbType,
            host:
              databaseConnection.host
                .trim()
                .replace(
                  /:\d+$/,
                  ""
                ),
            port:
              databaseConnection.port.trim(),
            database:
              databaseConnection.database.trim(),
            username:
              databaseConnection.username.trim(),
            password:
              databaseConnection.password,
          };
        } else {
          payload = {
            type:
              "1c",
            host:
              oneC.host.trim(),
            database:
              oneC.database.trim(),
            username:
              oneC.username.trim(),
            password:
              oneC.password,
          };
        }

        const response =
          await fetch(
            `${API_URL}/onboarding/test-connection`,
            {
              method:
                "POST",
              headers,
              body:
                JSON.stringify(
                  payload
                ),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            data.error ||
              data.message ||
              "Холболт амжилтгүй."
          );
        }

        if (
          connectionType ===
          "database"
        ) {
          applyDatabaseResult(
            data
          );
        }

        setConnectionOk(
          true
        );
      } catch (
        err
      ) {
        setConnectionOk(
          false
        );

        setError(
          err.message
        );
      } finally {
        setConnectionLoading(
          false
        );
      }
    };

  const saveConnection =
    async () => {
      try {
        setError(
          ""
        );

        if (
          !connectionOk
        ) {
          throw new Error(
            "Эхлээд холболтоо шалгана уу."
          );
        }

        let payload;

        if (
          connectionType ===
          "database"
        ) {
          payload = {
            type:
              "database",
            dbType:
              databaseConnection.dbType,
            host:
              databaseConnection.host
                .trim()
                .replace(
                  /:\d+$/,
                  ""
                ),
            port:
              databaseConnection.port.trim(),
            database:
              databaseConnection.database.trim(),
            username:
              databaseConnection.username.trim(),
            password:
              databaseConnection.password,
          };
        } else if (
          connectionType ===
          "1c"
        ) {
          payload = {
            type:
              "1c",
            ...oneC,
          };
        } else {
          payload = {
            type:
              "excel",
            filename:
              excelFile
                ?.name ||
              null,
          };
        }

        const response =
          await fetch(
            `${API_URL}/onboarding/connection`,
            {
              method:
                "POST",
              headers,
              body:
                JSON.stringify(
                  payload
                ),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            data.error ||
              data.message ||
              "Холболтын мэдээлэл хадгалж чадсангүй."
          );
        }

        if (
          data.analysis
        ) {
          applyDatabaseResult({
            connection: {
              dbType:
                data.analysis
                  .dbType,
              database:
                data.analysis
                  .database,
              username:
                data.analysis
                  .username,
              version:
                data.analysis
                  .version,
            },
            groups:
              data.analysis
                .groups,
            mappings:
              data.analysis
                .mappings,
            metrics:
              data.analysis
                .metrics,
            dashboards:
              data.analysis
                .dashboards,
          });
        }

        setDetectionStage(
          0
        );

        setDetectionProgress(
          0
        );

        setStep3Screen(
          "detect"
        );

        setStep(
          3
        );
      } catch (
        err
      ) {
        setError(
          err.message
        );
      }
    };

  const toggleTable = (
    groupId,
    tableName
  ) => {
    setGroups(
      (
        previous
      ) =>
        previous.map(
          (
            group
          ) => {
            if (
              group.id !==
              groupId
            ) {
              return group;
            }

            return {
              ...group,
              items:
                group.items.map(
                  (
                    item
                  ) =>
                    item.name ===
                    tableName
                      ? {
                          ...item,
                          selected:
                            !item.selected,
                        }
                      : item
                ),
            };
          }
        )
    );
  };

  const createDashboard =
    async () => {
      try {
        setError(
          ""
        );

        const selectedTables =
          groups.flatMap(
            (
              group
            ) =>
              group.items
                .filter(
                  (
                    item
                  ) =>
                    item.selected
                )
                .map(
                  (
                    item
                  ) => ({
                    group:
                      group.id,
                    schema:
                      item.schema,
                    table:
                      item.name,
                  })
                )
          );

        if (
          selectedTables.length ===
          0
        ) {
          throw new Error(
            "Хамгийн багадаа нэг хүснэгт сонгоно уу."
          );
        }

        const response =
          await fetch(
            `${API_URL}/onboarding/complete`,
            {
              method:
                "POST",
              headers,
              body:
                JSON.stringify({
                  selectedTables,
                  mapping:
                    mappings,
                  dashboards,
                  metrics,
                }),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            data.message ||
              "Dashboard үүсгэж чадсангүй."
          );
        }

        const currentUser =
          JSON.parse(
            localStorage.getItem(
              "user"
            ) ||
              "{}"
          );

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...currentUser,
            onboarding_completed:
              true,
          })
        );

        setStep(
          4
        );

        setStep4Screen(
          "building"
        );
      } catch (
        err
      ) {
        setError(
          err.message
        );
      }
    };

  const renderProgress =
    () => {
      const items = [
        {
          number:
            1,
          name:
            "Компани",
        },
        {
          number:
            2,
          name:
            "Холболт",
        },
        {
          number:
            3,
          name:
            "Хүснэгт",
        },
        {
          number:
            4,
          name:
            "Бэлэн",
        },
      ];

      return (
        <div className="setup-progress">
          {items.map(
            (
              item,
              index
            ) => {
              const complete =
                step >
                item.number;

              const active =
                step ===
                item.number;

              return (
                <div
                  className="setup-progress-part"
                  key={
                    item.number
                  }
                >
                  <div
                    className={`setup-progress-step ${
                      complete
                        ? "complete"
                        : ""
                    } ${
                      active
                        ? "active"
                        : ""
                    }`}
                  >
                    <span>
                      {complete
                        ? "✓"
                        : item.number}
                    </span>

                    <strong>
                      {
                        item.name
                      }
                    </strong>
                  </div>

                  {index <
                    items.length -
                      1 && (
                    <div
                      className={`setup-progress-line ${
                        step >
                        item.number
                          ? "complete"
                          : ""
                      }`}
                    />
                  )}
                </div>
              );
            }
          )}
        </div>
      );
    };

  const renderCompany =
    () => (
      <div className="setup-section">
        <div className="setup-title">
          <h1>
            Компанийн мэдээлэл
          </h1>

          <p>
            Таны компанийн нэмэлт мэдээлэл оруулна уу
          </p>
        </div>

        <div className="setup-card">
          <div className="setup-field">
            <label>
              Компанийн лого
            </label>

            <div className="setup-logo-row">
              <label className="setup-logo-preview">
                {company.logo ? (
                  <img
                    src={URL.createObjectURL(
                      company.logo
                    )}
                    alt="Company logo"
                  />
                ) : (
                  <div className="setup-logo-placeholder">
                    <span className="setup-logo-camera">
                      📷
                    </span>

                    <span className="setup-logo-text">
                      Лого
                    </span>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  hidden
                  onChange={(
                    event
                  ) =>
                    updateCompany(
                      "logo",
                      event.target
                        .files?.[0] ||
                        null
                    )
                  }
                />
              </label>

              <div className="setup-logo-actions">
                <label className="setup-upload-button">
                  Лого оруулах

                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    hidden
                    onChange={(
                      event
                    ) =>
                      updateCompany(
                        "logo",
                        event.target
                          .files?.[0] ||
                          null
                      )
                    }
                  />
                </label>

                <p className="setup-hint">
                  PNG, JPG (макс 2MB)
                </p>
              </div>
            </div>
          </div>

          <div className="setup-field">
            <label>
              Регистрийн дугаар
            </label>

            <input
              type="text"
              placeholder="1234567"
              value={
                company.registrationNumber
              }
              onChange={(
                event
              ) =>
                updateCompany(
                  "registrationNumber",
                  event.target.value
                )
              }
            />
          </div>

          <div className="setup-field">
            <label>
              Хаяг
            </label>

            <input
              type="text"
              placeholder="СБД 8-р хороо, Улаанбаатар"
              value={
                company.address
              }
              onChange={(
                event
              ) =>
                updateCompany(
                  "address",
                  event.target.value
                )
              }
            />
          </div>

          <div className="setup-field">
            <label>
              Ажилчдын тоо
            </label>

            <div className="setup-choice-row">
              {[
                "1-10",
                "11-50",
                "51-200",
                "200+",
              ].map(
                (
                  value
                ) => (
                  <button
                    type="button"
                    key={
                      value
                    }
                    className={
                      company.employeeCount ===
                      value
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      updateCompany(
                        "employeeCount",
                        value
                      )
                    }
                  >
                    {
                      value
                    }
                  </button>
                )
              )}
            </div>
          </div>

          <div className="setup-field">
            <label>
              Одоо ашиглаж буй систем
            </label>

            <div className="setup-system-row">
              {[
                "Database",
                "1C",
                "Excel",
                "Google Sheets",
                "Бусад",
              ].map(
                (
                  value
                ) => (
                  <button
                    type="button"
                    key={
                      value
                    }
                    className={
                      company.system ===
                      value
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      updateCompany(
                        "system",
                        value
                      )
                    }
                  >
                    {
                      value
                    }
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        <div className="setup-bottom-actions">
          <button
            type="button"
            className="setup-back-button"
            onClick={() =>
              navigate(
                "/signup"
              )
            }
          >
            ← Буцах
          </button>

          <button
            type="button"
            className="setup-next-button"
            onClick={
              saveCompany
            }
          >
            Дараагийн алхам →
          </button>
        </div>
      </div>
    );

  const renderConnection =
    () => (
      <div className="setup-section">
        <div className="setup-title">
          <h1>
            Мэдээллийн сан холбох
          </h1>

          <p>
            {connectionType ===
            "database"
              ? "Мэдээллийн сангийн холболтын мэдээллийг оруулна уу"
              : connectionType ===
                "1c"
              ? "1C Enterprise серверийн мэдээллийг оруулна уу"
              : "Excel эсвэл CSV файл оруулна уу"}
          </p>
        </div>

        <div className="setup-card connection-card">
          <div className="setup-tabs">
            <button
              type="button"
              className={
                connectionType ===
                "database"
                  ? "active"
                  : ""
              }
              onClick={() =>
                selectConnectionType(
                  "database"
                )
              }
            >
              Database
            </button>

            <button
              type="button"
              className={
                connectionType ===
                "1c"
                  ? "active"
                  : ""
              }
              onClick={() =>
                selectConnectionType(
                  "1c"
                )
              }
            >
              1C
            </button>

            <button
              type="button"
              className={
                connectionType ===
                "excel"
                  ? "active"
                  : ""
              }
              onClick={() =>
                selectConnectionType(
                  "excel"
                )
              }
            >
              Excel / CSV
            </button>
          </div>

          {connectionType ===
            "database" && (
            <div className="connection-form">
              <div className="setup-field">
                <label>
                  Database төрөл *
                </label>

                <select
                  value={
                    databaseConnection.dbType
                  }
                  onChange={(
                    event
                  ) =>
                    handleDatabaseTypeChange(
                      event.target.value
                    )
                  }
                >
                  <option value="mysql">
                    MySQL
                  </option>

                  <option value="postgresql">
                    PostgreSQL
                  </option>

                  <option value="mssql">
                    Microsoft SQL Server
                  </option>
                </select>
              </div>

              <div className="setup-grid-2">
                <div className="setup-field">
                  <label>
                    Host / IP хаяг *
                  </label>

                  <input
                    type="text"
                    placeholder="localhost"
                    value={
                      databaseConnection.host
                    }
                    onChange={(
                      event
                    ) =>
                      updateDatabaseConnection(
                        "host",
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="setup-field">
                  <label>
                    Порт *
                  </label>

                  <input
                    type="text"
                    value={
                      databaseConnection.port
                    }
                    onChange={(
                      event
                    ) =>
                      updateDatabaseConnection(
                        "port",
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="setup-field">
                <label>
                  Мэдээллийн сангийн нэр *
                </label>

                <input
                  type="text"
                  placeholder="company_database"
                  value={
                    databaseConnection.database
                  }
                  onChange={(
                    event
                  ) =>
                    updateDatabaseConnection(
                      "database",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="setup-grid-2 setup-grid-even">
                <div className="setup-field">
                  <label>
                    Хэрэглэгчийн нэр *
                  </label>

                  <input
                    type="text"
                    placeholder="readonly_user"
                    value={
                      databaseConnection.username
                    }
                    onChange={(
                      event
                    ) =>
                      updateDatabaseConnection(
                        "username",
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="setup-field">
                  <label>
                    Нууц үг *
                  </label>

                  <input
                    type="password"
                    value={
                      databaseConnection.password
                    }
                    onChange={(
                      event
                    ) =>
                      updateDatabaseConnection(
                        "password",
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {connectionType ===
            "1c" && (
            <div className="connection-form">
              <div className="setup-field">
                <label>
                  Серверийн хаяг *
                </label>

                <input
                  type="text"
                  value={
                    oneC.host
                  }
                  onChange={(
                    event
                  ) =>
                    updateOneC(
                      "host",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="setup-grid-2 setup-grid-even">
                <div className="setup-field">
                  <label>
                    Нэвтрэх нэр *
                  </label>

                  <input
                    type="text"
                    value={
                      oneC.username
                    }
                    onChange={(
                      event
                    ) =>
                      updateOneC(
                        "username",
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="setup-field">
                  <label>
                    Нууц үг *
                  </label>

                  <input
                    type="password"
                    value={
                      oneC.password
                    }
                    onChange={(
                      event
                    ) =>
                      updateOneC(
                        "password",
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="setup-field">
                <label>
                  Мэдээллийн сангийн нэр *
                </label>

                <input
                  type="text"
                  value={
                    oneC.database
                  }
                  onChange={(
                    event
                  ) =>
                    updateOneC(
                      "database",
                      event.target.value
                    )
                  }
                />
              </div>
            </div>
          )}

          {connectionType ===
            "excel" && (
            <div className="excel-upload">
              <span className="excel-folder">
                📁
              </span>

              <h3>
                Excel эсвэл CSV файлаа энд оруулна уу
              </h3>

              <label className="excel-select-button">
                Файл сонгох

                <input
                  type="file"
                  hidden
                  accept=".xlsx,.xls,.csv"
                  onChange={(
                    event
                  ) => {
                    setExcelFile(
                      event.target
                        .files?.[0] ||
                        null
                    );

                    setConnectionOk(
                      false
                    );
                  }}
                />
              </label>

              {excelFile && (
                <strong className="excel-file-name">
                  {
                    excelFile.name
                  }
                </strong>
              )}
            </div>
          )}

          <div className="connection-check-row">
            <button
              type="button"
              className="connection-test-button"
              disabled={
                connectionLoading
              }
              onClick={
                testConnection
              }
            >
              {connectionLoading
                ? "Шалгаж байна..."
                : "🔗 Холболт шалгах"}
            </button>

            {connectionOk && (
              <span className="connection-success">
                ✓ Холболт амжилттай
                {connectionInfo
                  ?.database
                  ? ` — ${connectionInfo.database}`
                  : ""}
              </span>
            )}
          </div>
        </div>

        <div className="setup-bottom-actions">
          <button
            type="button"
            className="setup-back-button"
            onClick={() =>
              setStep(
                1
              )
            }
          >
            ← Буцах
          </button>

          <button
            type="button"
            className="setup-next-button"
            disabled={
              !connectionOk
            }
            onClick={
              saveConnection
            }
          >
            Дараагийн алхам →
          </button>
        </div>
      </div>
    );

  const renderDetection =
    () => {
      const completed =
        Math.min(
          detectionStage,
          detectionStages.length
        );

      return (
        <div className="setup-section detection-section">
          <div className="setup-title">
            <h1>
              Мэдээллийн бүтэц танигдаж байна...
            </h1>

            <p>
              Систем автоматаар таны мэдээллийн сангийн бүтцийг шинжилж байна
            </p>
          </div>

          <div className="setup-card detection-card">
            <div className="detection-progress-header">
              <span>
                Нийт явц
              </span>

              <strong>
                {
                  detectionProgress
                }
                %
              </strong>
            </div>

            <div className="detection-progress-track">
              <div
                style={{
                  width:
                    `${detectionProgress}%`,
                }}
              />
            </div>

            <div className="detection-step-count">
              {
                completed
              } /{" "}
              {
                detectionStages.length
              } алхам дууслаа
            </div>

            <div className="detection-list">
              {detectionStages.map(
                (
                  item,
                  index
                ) => {
                  const done =
                    index <
                    detectionStage;

                  const active =
                    index ===
                      detectionStage &&
                    detectionStage <
                      detectionStages.length;

                  return (
                    <div
                      className={`detection-item ${
                        done
                          ? "done"
                          : ""
                      } ${
                        active
                          ? "active"
                          : ""
                      }`}
                      key={
                        item.title
                      }
                    >
                      <div className="detection-item-left">
                        <span className="detection-state-icon">
                          {done
                            ? "✓"
                            : active
                            ? ""
                            : ""}
                        </span>

                        <strong>
                          {
                            item.title
                          }
                        </strong>
                      </div>

                      <span className="detection-item-status">
                        {done
                          ? "Дууслаа"
                          : active
                          ? "Боловсруулж байна..."
                          : ""}
                      </span>
                    </div>
                  );
                }
              )}
            </div>

            <div className="detection-result">
              <strong>
                {Number(
                  metrics.tableCount ||
                    0
                ).toLocaleString()}{" "}
                хүснэгтээс
              </strong>

              <span>
                {" "}
                {groups
                  .reduce(
                    (
                      total,
                      group
                    ) =>
                      total +
                      group.items.length,
                    0
                  )
                  .toLocaleString()}{" "}
                хүснэгт илэрлээ
              </span>
            </div>
          </div>
        </div>
      );
    };

  const renderTables =
    () => (
      <div className="setup-section setup-table-section">
        <div className="setup-title">
          <h1>
            Илрүүлсэн хүснэгтүүд
          </h1>

          <p>
            Холбогдсон мэдээллийн сангаас олдсон бодит хүснэгтүүд
          </p>
        </div>

        <div className="table-groups">
          {groups.map(
            (
              group
            ) => {
              const selectedCount =
                group.items.filter(
                  (
                    item
                  ) =>
                    item.selected
                ).length;

              const opened =
                openGroup ===
                group.id;

              return (
                <div
                  className="table-group"
                  key={
                    group.id
                  }
                >
                  <button
                    type="button"
                    className="table-group-header"
                    onClick={() =>
                      setOpenGroup(
                        opened
                          ? ""
                          : group.id
                      )
                    }
                  >
                    <div className="table-group-header-info">
                      <strong>
                        {
                          group.name
                        }
                      </strong>

                      <span>
                        {
                          group.items.length
                        }{" "}
                        хүснэгт
                      </span>

                      <em>
                        {
                          selectedCount
                        }{" "}
                        сонгогдсон
                      </em>
                    </div>

                    <span className="table-group-chevron">
                      {opened
                        ? "▲"
                        : "▼"}
                    </span>
                  </button>

                  {opened && (
                    <div className="table-group-body">
                      <div className="table-row table-heading-row">
                        <span />

                        <span>
                          Хүснэгт
                        </span>

                        <span>
                          Бичилт
                        </span>

                        <span>
                          Багана
                        </span>
                      </div>

                      {group.items.map(
                        (
                          item
                        ) => (
                          <div
                            className="table-row"
                            key={`${item.schema}.${item.name}`}
                          >
                            <label className="setup-checkbox">
                              <input
                                type="checkbox"
                                checked={
                                  item.selected
                                }
                                onChange={() =>
                                  toggleTable(
                                    group.id,
                                    item.name
                                  )
                                }
                              />

                              <span />
                            </label>

                            <div className="table-name-cell">
                              <code
                                title={`${item.schema}.${item.name}`}
                              >
                                {
                                  item.schema
                                }.
                                {
                                  item.name
                                }
                              </code>
                            </div>

                            <strong className="table-row-count">
                              {Number(
                                item.rows ||
                                  0
                              ).toLocaleString()}
                            </strong>

                            <span className="table-column-count">
                              {
                                item.columns?.length ||
                                0
                              }{" "}
                              багана
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>

        <div className="setup-bottom-actions">
          <button
            type="button"
            className="setup-back-button"
            onClick={() => {
              setStep(
                2
              );

              setConnectionOk(
                true
              );
            }}
          >
            ← Буцах
          </button>

          <button
            type="button"
            className="setup-next-button"
            disabled={
              !groups.length
            }
            onClick={() =>
              setStep3Screen(
                "mapping"
              )
            }
          >
            Дараагийн алхам →
          </button>
        </div>
      </div>
    );

  const renderMapping =
    () => (
      <div className="setup-section setup-mapping-section">
        <div className="setup-title">
          <h1>
            Дансны бүтцийн тохиргоо
          </h1>

          <p>
            Холбогдсон мэдээллийн сангийн хүснэгт болон багануудаас автоматаар илрүүлсэн тохиргоо
          </p>
        </div>

        <div className="mapping-card">
          <div className="mapping-row mapping-heading">
            <span>
              DataView ангилал
            </span>

            <span>
              Илэрсэн эх үүсвэр
            </span>

            <span>
              Тоо
            </span>

            <span>
              Төлөв
            </span>
          </div>

          {mappings.map(
            (
              item
            ) => (
              <div
                className={`mapping-row ${
                  item.status !==
                  "Таарсан"
                    ? "warning"
                    : ""
                }`}
                key={
                  item.id
                }
              >
                <strong className="mapping-category">
                  <span>
                    {
                      item.icon
                    }
                  </span>

                  <span>
                    {
                      item.name
                    }
                  </span>
                </strong>

                <div className="mapping-source">
                  {item.matches?.length ? (
                    <>
                      {item.matches
                        .slice(
                          0,
                          2
                        )
                        .map(
                          (
                            match,
                            index
                          ) => (
                            <code
                              title={`${match.table}.${match.column}`}
                              key={`${match.table}-${match.column}-${index}`}
                            >
                              {
                                match.table
                              }.
                              {
                                match.column
                              }
                            </code>
                          )
                        )}

                      {item.matches.length >
                        2 && (
                        <span className="mapping-more">
                          +{" "}
                          {
                            item.matches.length -
                            2
                          } бусад
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="mapping-empty">
                      Олдсонгүй
                    </span>
                  )}
                </div>

                <b className="mapping-count">
                  {
                    item.count
                  }
                </b>

                <span
                  className={`mapping-status ${
                    item.status ===
                    "Таарсан"
                      ? "success"
                      : "warning"
                  }`}
                >
                  {item.status ===
                  "Таарсан"
                    ? "✓ Таарсан"
                    : "⚠ Олдсонгүй"}
                </span>
              </div>
            )
          )}
        </div>

        <div className="mapping-total">
          <div>
            <strong>
              Нийт хүснэгт:
            </strong>

            <span>
              {Number(
                metrics.tableCount ||
                  0
              ).toLocaleString()}
            </span>
          </div>

          <div>
            <strong>
              Нийт бичилт:
            </strong>

            <span>
              {Number(
                metrics.totalRows ||
                  0
              ).toLocaleString()}
            </span>
          </div>

          <div>
            <strong>
              Илэрсэн орлогын нийлбэр:
            </strong>

            <span>
              {metrics.incomeTotal !==
              null
                ? Number(
                    metrics.incomeTotal
                  ).toLocaleString()
                : "Тодорхойлогдоогүй"}
            </span>
          </div>
        </div>

        <div className="setup-bottom-actions">
          <button
            type="button"
            className="setup-back-button"
            onClick={() =>
              setStep3Screen(
                "tables"
              )
            }
          >
            ← Буцах
          </button>

          <button
            type="button"
            className="setup-next-button"
            onClick={
              createDashboard
            }
          >
            Dashboard үүсгэх →
          </button>
        </div>
      </div>
    );

  const renderBuilding =
    () => (
      <div className="building-screen">
        <div
          className="build-ring"
          style={{
            background:
              `conic-gradient(#2ec4b6 ${
                buildProgress *
                3.6
              }deg, #e9faf8 0deg)`,
          }}
        >
          <div>
            {
              buildProgress
            }
            %
          </div>
        </div>

        <h1>
          Dashboard бэлтгэж байна...
        </h1>

        <p>
          {Number(
            metrics.totalRows ||
              0
          ).toLocaleString()}{" "}
          бичилтийг боловсруулж байна
        </p>

        <div className="building-card">
          {dashboards.map(
            (
              dashboard,
              index
            ) => {
              const threshold =
                Math.round(
                  ((index +
                    1) /
                    Math.max(
                      dashboards.length,
                      1
                    )) *
                    100
                );

              const done =
                dashboard.ready &&
                buildProgress >=
                  threshold;

              const active =
                dashboard.ready &&
                !done &&
                buildProgress >=
                  threshold -
                    20;

              return (
                <div
                  key={
                    dashboard.id
                  }
                  className={`building-item ${
                    done
                      ? "done"
                      : active
                      ? "active"
                      : ""
                  }`}
                >
                  <span>
                    {done
                      ? "✓"
                      : active
                      ? ""
                      : ""}
                  </span>

                  <strong>
                    {
                      dashboard.name
                    }
                  </strong>

                  <em>
                    {!dashboard.ready
                      ? "Өгөгдөл олдсонгүй"
                      : done
                      ? "Бэлэн"
                      : active
                      ? "Боловсруулж байна..."
                      : ""}
                  </em>
                </div>
              );
            }
          )}
        </div>
      </div>
    );

  const readyDashboards =
    dashboards.filter(
      (
        dashboard
      ) =>
        dashboard.ready
    );

  const renderComplete =
    () => (
      <div className="complete-screen">
        <div className="complete-check">
          ✓
        </div>

        <h1>
          Dashboard бэлэн боллоо!
        </h1>

        <p>
          {readyDashboards.length} dashboard амжилттай үүслээ
        </p>

        <div className="complete-card">
          {readyDashboards.map(
            (
              dashboard
            ) => (
              <div
                className="complete-item"
                key={
                  dashboard.id
                }
              >
                <strong>
                  <span>
                    {
                      dashboard.icon
                    }
                  </span>

                  {
                    dashboard.name
                  }
                </strong>

                <em>
                  Бэлэн ✓
                </em>
              </div>
            )
          )}
        </div>

        <button
          type="button"
          className="complete-dashboard-button"
          onClick={() =>
            navigate(
              "/dashboard"
            )
          }
        >
          Dashboard үзэх →
        </button>
      </div>
    );

  return (
    <div className="setup-page">
      <header className="setup-header">
        <div className="setup-brand">
          <span>
            D
          </span>

          DataView
        </div>
      </header>

      {
        renderProgress()
      }

      <main className="setup-main">
        {error && (
          <div className="setup-error">
            {
              error
            }
          </div>
        )}

        {step ===
          1 &&
          renderCompany()}

        {step ===
          2 &&
          renderConnection()}

        {step ===
          3 &&
          step3Screen ===
            "detect" &&
          renderDetection()}

        {step ===
          3 &&
          step3Screen ===
            "tables" &&
          renderTables()}

        {step ===
          3 &&
          step3Screen ===
            "mapping" &&
          renderMapping()}

        {step ===
          4 &&
          step4Screen ===
            "building" &&
          renderBuilding()}

        {step ===
          4 &&
          step4Screen ===
            "complete" &&
          renderComplete()}
      </main>
    </div>
  );
}

export default Setup;