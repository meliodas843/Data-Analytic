import {
  Database,
  Send,
  ShieldCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function DataConnectionSettings() {
  const navigate = useNavigate();

  return (
    <div className="settings-inner">
      <div className="settings-page-title">
        <h1>Дата холболт</h1>
        <p>
          Системийн холболт, sync-ийн төлөв
          ба давтамж
        </p>
      </div>

      <div className="data-settings-grid">
        <section className="settings-card">
          <div className="connection-status">
            <div className="connection-icon">
              <Database size={25} />
            </div>

            <div>
              <h3>
                <span className="status-dot" />
                Холбогдоогүй
              </h3>

              <p>
                Dashboard одоо жишээ дата
                харуулж байна. Системээ
                холбоход 14 хоногийн үнэгүй
                туршилт эхэлнэ.
              </p>
            </div>
          </div>

          <div className="connection-steps">
            {[
              ["1", "Систем сонгох"],
              ["2", "Холболтын мэдээлэл"],
              ["3", "Холболт шалгах"],
              ["4", "Sync эхлэх"],
            ].map(([number, title]) => (
              <div
                className="connection-step"
                key={number}
              >
                <span>{number}</span>
                <strong>{title}</strong>
              </div>
            ))}
          </div>

          <div className="connection-actions">
            <button
              type="button"
              className="settings-primary-button"
              onClick={() =>
                navigate("/setup")
              }
            >
              Дата холбох
            </button>

            <button
              type="button"
              className="settings-secondary-button"
            >
              <Send size={16} />
              IT ажилтанд илгээх
            </button>
          </div>
        </section>

        <section className="settings-card">
          <h3>Аюулгүй байдал</h3>

          <div className="security-list">
            <div>
              <ShieldCheck size={18} />
              <p>
                Зөвхөн унших эрхтэй хэрэглэгч
                ашиглана. Таны датаг
                өөрчлөхгүй.
              </p>
            </div>

            <div>
              <ShieldCheck size={18} />
              <p>
                Холболтын нууц үг
                шифрлэгдэж хадгалагдана.
              </p>
            </div>

            <div>
              <ShieldCheck size={18} />
              <p>
                Серверийн firewall-д
                DataView-ийн IP хаягийг
                нэмнэ. Хаяг холбох алхамд
                харагдана.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}