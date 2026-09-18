import {
  Image,
  Plus,
  Pencil,
  Trash2,
  Upload,
} from "lucide-react";

export default function OrganizationSettings() {
  return (
    <div className="settings-inner">
      <div className="settings-page-title">
        <h1>Байгууллага</h1>
        <p>
          Байгууллагын мэдээлэл, салбар,
          санхүүгийн тохиргоо
        </p>
      </div>

      <div className="settings-top-grid">
        <section className="settings-card">
          <h3>Үндсэн мэдээлэл</h3>
          <p className="settings-card-subtitle">
            Dashboard болон нэхэмжлэл дээр
            харагдана
          </p>

          <div className="settings-field">
            <label>Байгууллагын нэр</label>
            <input
              type="text"
              defaultValue="Монголын Компани ХХК"
            />
          </div>

          <div className="settings-form-grid">
            <div className="settings-field">
              <label>Регистрийн дугаар</label>
              <input
                type="text"
                defaultValue="6123456"
              />
              <small>
                И-баримт, нэхэмжлэлд ашиглана
              </small>
            </div>

            <div className="settings-field">
              <label>
                Үйл ажиллагааны чиглэл
              </label>

              <select defaultValue="trade">
                <option value="trade">
                  Худалдаа
                </option>
                <option value="service">
                  Үйлчилгээ
                </option>
                <option value="production">
                  Үйлдвэрлэл
                </option>
              </select>
            </div>

            <div className="settings-field">
              <label>Ажилчдын тоо</label>

              <select defaultValue="51-200">
                <option>1-10</option>
                <option>11-50</option>
                <option>51-200</option>
                <option>201-500</option>
                <option>500+</option>
              </select>
            </div>

            <div className="settings-field">
              <label>НӨАТ төлөгч</label>

              <div className="settings-toggle-box">
                <span className="settings-toggle active">
                  <span />
                </span>

                <span>
                  Тийм — 10% НӨАТ тооцно
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="settings-card">
          <h3>Лого</h3>
          <p className="settings-card-subtitle">
            Dashboard-ын толгой хэсэгт
            харагдана
          </p>

          <div className="settings-logo-upload">
            <div className="settings-upload-icon">
              <Image size={28} />
            </div>

            <strong>
              Файлаа энд чирж оруулна уу
            </strong>

            <span>
              PNG, JPG, SVG · 2MB хүртэл ·
              1:1 харьцаа
            </span>

            <button type="button">
              <Upload size={16} />
              Файл сонгох
            </button>
          </div>
        </section>
      </div>

      <section className="settings-card">
        <h3>Санхүүгийн тохиргоо</h3>
        <p className="settings-card-subtitle">
          Тайлангийн хугацаа, дүнгийн
          тооцоололд нөлөөлнө
        </p>

        <div className="settings-finance-grid">
          <div className="settings-field">
            <label>
              Санхүүгийн жил эхлэх сар
            </label>

            <select defaultValue="1">
              <option value="1">1-р сар</option>
              <option value="2">2-р сар</option>
              <option value="3">3-р сар</option>
            </select>
          </div>

          <div className="settings-field">
            <label>Валют</label>

            <select defaultValue="MNT">
              <option value="MNT">
                ₮ Төгрөг (MNT)
              </option>
              <option value="USD">
                $ Dollar (USD)
              </option>
            </select>
          </div>

          <div className="settings-field">
            <label>Цагийн бүс</label>

            <select defaultValue="UB">
              <option value="UB">
                Улаанбаатар (UTC+8)
              </option>
            </select>
          </div>
        </div>
      </section>

      <section className="settings-card settings-branches">
        <div className="settings-card-header">
          <div>
            <h3>Салбарууд</h3>
            <p className="settings-card-subtitle">
              Dashboard-ын салбарын шүүлтүүр
              болон хэрэглэгчийн эрхэд
              ашиглагдана
            </p>
          </div>

          <button
            type="button"
            className="settings-secondary-button"
          >
            <Plus size={17} />
            Салбар нэмэх
          </button>
        </div>

        <div className="settings-branch-table">
          <div className="settings-table-head">
            <span>Салбарын нэр</span>
            <span>Хот / аймаг</span>
            <span>Үйлдэл</span>
          </div>

          {[
            ["Төв оффис", "Улаанбаатар"],
            ["Нийслэл", "Улаанбаатар"],
            ["Дархан", "Дархан-Уул"],
            ["Эрдэнэт", "Орхон"],
          ].map(([name, city]) => (
            <div
              className="settings-table-row"
              key={name}
            >
              <strong>{name}</strong>
              <span>{city}</span>

              <div className="settings-table-actions">
                <button type="button">
                  <Pencil size={16} />
                </button>

                <button type="button">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}