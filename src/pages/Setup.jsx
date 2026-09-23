import {
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";
import logo from "../assets/logo-default.svg";
import {
  Database,
  Server,
  FileSpreadsheet,
  CircleHelp,
  BarChart3,
} from "lucide-react";

import "../styles/Setup.css";

const roles = [
  "Захирал",
  "Нягтлан бодогч",
  "Санхүүгийн менежер",
  "IT ажилтан",
  "Бусад",
];

const employeeOptions = [
  "1-10",
  "11-50",
  "51-200",
  "200+",
];

const industries = [
  "Худалдаа",
  "Үйлчилгээ",
  "Үйлдвэрлэл",
  "Барилга",
  "Уул уурхай",
  "Тээвэр, логистик",
  "Банк, санхүү",
  "Мэдээллийн технологи",
  "Боловсрол",
  "Эрүүл мэнд",
  "Бусад",
];

const systems = [
  {
    id: "odoo",
    name: "Odoo",
    description: "ERP систем",
    icon: Database,
  },
  {
    id: "1c",
    name: "1C",
    description: "Бүртгэлийн систем",
    icon: Server,
  },
  {
    id: "excel",
    name: "Excel / Google Sheets",
    description: "Хүснэгт",
    icon: FileSpreadsheet,
  },
  {
    id: "other",
    name: "Бусад",
    description: "Өөр систем",
    icon: CircleHelp,
  },
];

function DataViewLogo() {
  return (
    <div className="setup-brand">
      <img
        src={logo}
        alt="DataView"
        className="navbar-logo-image"
      />
    </div>
  );
}

function Setup() {
  const navigate = useNavigate();

  const [step, setStep] =
    useState(1);

  const [
    companyName,
    setCompanyName,
  ] = useState(
    sessionStorage.getItem(
      "signupCompanyName"
    ) || ""
  );

  const [
    branchCount,
    setBranchCount,
  ] = useState("1");

  const [
    selectedRole,
    setSelectedRole,
  ] = useState("");

  const [
    employeeCount,
    setEmployeeCount,
  ] = useState("");

  const [
    industry,
    setIndustry,
  ] = useState("");

  const [
    selectedSystems,
    setSelectedSystems,
  ] = useState([]);

  const [
    error,
    setError,
  ] = useState("");

  const toggleSystem = (
    systemId
  ) => {
    setError("");

    setSelectedSystems(
      (current) => {
        if (
          current.includes(
            systemId
          )
        ) {
          return current.filter(
            (item) =>
              item !== systemId
          );
        }

        return [
          ...current,
          systemId,
        ];
      }
    );
  };

  const formValid =
    useMemo(() => {
      return (
        companyName.trim() !== "" &&
        selectedRole !== "" &&
        employeeCount !== "" &&
        selectedSystems.length > 0
      );
    }, [
      companyName,
      selectedRole,
      employeeCount,
      selectedSystems,
    ]);

  const handleContinue = () => {
    if (!formValid) {
      setError(
        "Байгууллагын нэр, албан тушаал, ажилчдын тоо, системийг сонгоно уу."
      );

      return;
    }

    const onboardingData = {
      companyName:
        companyName.trim(),
      branchCount,
      role: selectedRole,
      employeeCount,
      industry,
      systems:
        selectedSystems,
    };

    sessionStorage.setItem(
      "onboardingCompany",
      JSON.stringify(
        onboardingData
      )
    );

    setError("");
    setStep(2);
  };

const handleBack = () => {
  if (step > 1) {
    setStep(
      (current) =>
        current - 1
    );

    return;
  }

  navigate(
    "/dashboard"
  );
};

  return (
    <main className="setup-page">
      <DataViewLogo />

      <section className="setup-card">
        <div className="setup-progress">
          <div
            className={`setup-progress-item ${
              step >= 1
                ? "active"
                : ""
            }`}
          >
            <span className="setup-step-circle">
              1
            </span>

            <span className="setup-step-name">
              Байгууллага
            </span>
          </div>

          <div className="setup-progress-line" />

          <div
            className={`setup-progress-item ${
              step >= 2
                ? "active"
                : ""
            }`}
          >
            <span className="setup-step-circle">
              2
            </span>

            <span className="setup-step-name">
              Систем холбох
            </span>
          </div>

          <div className="setup-progress-line" />

          <div
            className={`setup-progress-item ${
              step >= 3
                ? "active"
                : ""
            }`}
          >
            <span className="setup-step-circle">
              3
            </span>

            <span className="setup-step-name">
              Бэлэн
            </span>
          </div>
        </div>

        {step === 1 && (
          <>
            <div className="setup-heading">
              <h1>
                Байгууллагынхаа тухай
                хэлнэ үү
              </h1>

              <p>
                Таны салбар,
                системд тохирсон
                dashboard бэлдэнэ
              </p>
            </div>

            <div className="setup-form">
              <div className="setup-top-grid">
                <div className="setup-field">
                  <label>
                    Байгууллагын нэр
                    <span> *</span>
                  </label>

                  <input
                    type="text"
                    value={
                      companyName
                    }
                    onChange={(
                      event
                    ) => {
                      setCompanyName(
                        event.target
                          .value
                      );

                      setError("");
                    }}
                    placeholder="Монголын Компани ХХК"
                  />
                </div>

                <div className="setup-field">
                  <label>
                    Салбарын тоо
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={
                      branchCount
                    }
                    onChange={(
                      event
                    ) =>
                      setBranchCount(
                        event.target
                          .value
                      )
                    }
                  />
                </div>
              </div>

              <div className="setup-section">
                <div className="setup-label">
                  Таны албан тушаал
                  <span> *</span>
                </div>

                <div className="setup-chip-row">
                  {roles.map(
                    (role) => (
                      <button
                        key={role}
                        type="button"
                        className={`setup-chip ${
                          selectedRole ===
                          role
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedRole(
                            role
                          );

                          setError("");
                        }}
                      >
                        {role}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="setup-section">
                <div className="setup-label">
                  Ажилчдын тоо
                  <span> *</span>
                </div>

                <div className="setup-chip-row">
                  {employeeOptions.map(
                    (option) => (
                      <button
                        key={option}
                        type="button"
                        className={`setup-chip ${
                          employeeCount ===
                          option
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => {
                          setEmployeeCount(
                            option
                          );

                          setError("");
                        }}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="setup-section">
                <label className="setup-label">
                  Үйл ажиллагааны чиглэл
                  <small>
                    (заавал биш)
                  </small>
                </label>

                <div className="setup-select-wrap">
                  <select
                    value={industry}
                    onChange={(
                      event
                    ) =>
                      setIndustry(
                        event.target
                          .value
                      )
                    }
                  >
                    <option value="">
                      Сонгоно уу
                    </option>

                    {industries.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="setup-section setup-system-section">
                <div className="setup-label">
                  Хэрэглэдэг систем
                  <span> *</span>
                </div>

                <p className="setup-helper">
                  Хэд хэдийг сонгож
                  болно
                </p>

                <div className="setup-system-grid">
                  {systems.map(
                    (system) => {
                      const Icon =
                        system.icon;

                      const selected =
                        selectedSystems.includes(
                          system.id
                        );

                      return (
                        <button
                          key={
                            system.id
                          }
                          type="button"
                          className={`setup-system-card ${
                            selected
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            toggleSystem(
                              system.id
                            )
                          }
                        >
                          <span className="setup-system-icon">
                            <Icon
                              size={22}
                              strokeWidth={
                                1.8
                              }
                            />
                          </span>

                          <span className="setup-system-info">
                            <strong>
                              {
                                system.name
                              }
                            </strong>

                            <small>
                              {
                                system.description
                              }
                            </small>
                          </span>

                          <span
                            className={`setup-checkbox ${
                              selected
                                ? "checked"
                                : ""
                            }`}
                          >
                            {selected
                              ? "✓"
                              : ""}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {error && (
                <div className="setup-error">
                  {error}
                </div>
              )}

              <div className="setup-footer">
                <button
                  type="button"
                  className="setup-back-button"
                  onClick={handleBack}
                >
                  <ArrowLeft
                    size={17}
                  />

                  <span>
                    Буцах
                  </span>
                </button>

                <div className="setup-footer-right">
                  {!formValid && (
                    <span className="setup-missing">
                      Дутуу:
                      байгууллагын нэр,
                      албан тушаал,
                      ажилчдын тоо,
                      систем
                    </span>
                  )}

                  <button
                    type="button"
                    className="setup-continue"
                    disabled={
                      !formValid
                    }
                    onClick={
                      handleContinue
                    }
                  >
                    Үргэлжлүүлэх
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="setup-placeholder-step">
            <h1>
              Систем холбох
            </h1>

            <p>
              Сонгосон системийн
              холболтын тохиргоо
              дараагийн алхамд
              энд харагдана.
            </p>

            <div className="setup-placeholder-actions">
              <button
                type="button"
                className="setup-back-button"
                onClick={() =>
                  setStep(1)
                }
              >
                Буцах
              </button>

              <button
                type="button"
                className="setup-green-button"
                onClick={() =>
                  setStep(3)
                }
              >
                Үргэлжлүүлэх
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="setup-placeholder-step setup-ready">
            <div className="setup-ready-icon">
              ✓
            </div>

            <h1>
              Бэлэн боллоо
            </h1>

            <p>
              Таны DataView
              dashboard ашиглахад
              бэлэн боллоо.
            </p>

            <button
              type="button"
              className="setup-green-button"
              onClick={() =>
                navigate(
                  "/dashboard",
                  {
                    replace: true,
                  }
                )
              }
            >
              Dashboard үзэх
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Setup;