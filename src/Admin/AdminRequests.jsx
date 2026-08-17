import {
  useEffect,
  useMemo,
  useState,
} from "react";

import "../styles/Admin/AdminRequests.css";


const API =
  "http://localhost:5000/api/requests";


const STATUS = {
  new: {
    label: "Шинэ",
    className: "status-new",
  },

  contacted: {
    label: "Холбогдсон",
    className: "status-contacted",
  },

  contract: {
    label: "Гэрээ",
    className: "status-contract",
  },

  active: {
    label: "Идэвхтэй",
    className: "status-active",
  },
};


function AdminRequests() {

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState("all");

  const [search, setSearch] =
    useState("");

  const [
    selectedRequest,
    setSelectedRequest,
  ] = useState(null);

  const [note, setNote] =
    useState("");


  /* ================================
     LOAD
  ================================= */

  const loadRequests =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(API);

        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message
          );

        }


        setRequests(
          data.requests || []
        );

      } catch (error) {

        console.error(
          "Load requests:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    loadRequests();

  }, []);


  /* ================================
     COUNTS
  ================================= */

  const newCount =
    requests.filter(
      (item) =>
        item.status === "new"
    ).length;


  /* ================================
     FILTER
  ================================= */

  const filteredRequests =
    useMemo(() => {

      return requests.filter(
        (item) => {

          if (
            filter !== "all" &&
            item.status !== filter
          ) {
            return false;
          }


          const query =
            search
              .trim()
              .toLowerCase();


          if (!query) {
            return true;
          }


          return (
            item.name
              ?.toLowerCase()
              .includes(query) ||

            item.company
              ?.toLowerCase()
              .includes(query) ||

            item.email
              ?.toLowerCase()
              .includes(query) ||

            item.phone
              ?.toLowerCase()
              .includes(query)
          );

        }
      );

    }, [
      requests,
      filter,
      search,
    ]);


  /* ================================
     OPEN REQUEST
  ================================= */

  const openRequest =
    async (id) => {

      try {

        const response =
          await fetch(
            `${API}/${id}`
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message
          );

        }


        setSelectedRequest(
          data.request
        );

      } catch (error) {

        console.error(
          error
        );

      }

    };


  /* ================================
     STATUS
  ================================= */

  const changeStatus =
    async (status) => {

      if (!selectedRequest) {
        return;
      }


      try {

        const response =
          await fetch(
            `${API}/${selectedRequest.id}/status`,
            {
              method: "PATCH",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  status,
                }),
            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message
          );

        }


        setSelectedRequest(
          (previous) => ({
            ...previous,
            status,
          })
        );


        setRequests(
          (previous) =>
            previous.map(
              (item) =>
                item.id ===
                selectedRequest.id
                  ? {
                      ...item,
                      status,
                    }
                  : item
            )
        );

      } catch (error) {

        console.error(
          error
        );

      }

    };


  /* ================================
     ADD NOTE
  ================================= */

  const addNote =
    async () => {

      if (
        !selectedRequest ||
        !note.trim()
      ) {
        return;
      }


      try {

        const response =
          await fetch(
            `${API}/${selectedRequest.id}/notes`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  note:
                    note.trim(),
                }),
            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message
          );

        }


        setNote("");


        await openRequest(
          selectedRequest.id
        );

      } catch (error) {

        console.error(
          error
        );

      }

    };


  /* ================================
     DATE
  ================================= */

  const formatDate =
    (date) => {

      if (!date) {
        return "-";
      }

      return new Date(
        date
      ).toLocaleDateString(
        "mn-MN"
      );

    };


  return (
    <div className="requests-page">

      <div className="requests-heading">

        <h1>
          Хүсэлтүүд
        </h1>

      </div>


      {/* FILTERS */}

      <div className="requests-toolbar">

        <div className="request-tabs">

          <button
            className={
              filter === "all"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("all")
            }
          >
            Бүгд
          </button>


          <button
            className={
              filter === "new"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("new")
            }
          >
            Шинэ ({newCount})
          </button>


          <button
            className={
              filter === "contacted"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter(
                "contacted"
              )
            }
          >
            Холбогдсон
          </button>


          <button
            className={
              filter === "contract"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter(
                "contract"
              )
            }
          >
            Гэрээ
          </button>


          <button
            className={
              filter === "active"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter(
                "active"
              )
            }
          >
            Идэвхтэй
          </button>

        </div>


        <input
          className="request-search"
          placeholder=
            "Нэр, компани, имэйлээр..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>


      {/* TABLE */}

      <div className="request-table-card">

        <table className="request-table">

          <thead>

            <tr>
              <th>НЭР</th>
              <th>КОМПАНИ</th>
              <th>УТАС</th>
              <th>СИСТЕМ</th>
              <th>ЗАГВАР</th>
              <th>СТАТУС</th>
              <th>ОГНОО</th>
              <th>ҮЙЛДЭЛ</th>
            </tr>

          </thead>


          <tbody>

            {loading ? (

              <tr>
                <td colSpan="8">
                  Уншиж байна...
                </td>
              </tr>

            ) : filteredRequests.length ===
              0 ? (

              <tr>
                <td
                  colSpan="8"
                  className="empty-row"
                >
                  Хүсэлт байхгүй байна.
                </td>
              </tr>

            ) : (

              filteredRequests.map(
                (item) => {

                  const status =
                    STATUS[
                      item.status
                    ] ||
                    STATUS.new;


                  return (

                    <tr
                      key={item.id}
                      onClick={() =>
                        openRequest(
                          item.id
                        )
                      }
                    >

                      <td className="request-name">
                        {item.name}
                      </td>

                      <td>
                        {item.company}
                      </td>

                      <td>
                        {item.phone}
                      </td>

                      <td>
                        {item.system_type ||
                          "-"}
                      </td>

                      <td>
                        {item.models
                          ?.length
                          ? item.models.join(
                              ", "
                            )
                          : "-"}
                      </td>

                      <td>

                        <span
                          className={`request-status ${status.className}`}
                        >
                          ●{" "}
                          {status.label}
                        </span>

                      </td>

                      <td>
                        {formatDate(
                          item.created_at
                        )}
                      </td>

                      <td>
                        <button
                          className="request-edit-button"
                          onClick={(
                            e
                          ) => {
                            e.stopPropagation();

                            openRequest(
                              item.id
                            );
                          }}
                        >
                          ✎
                        </button>
                      </td>

                    </tr>

                  );

                }
              )

            )}

          </tbody>

        </table>

      </div>


      {/* OVERLAY */}

      {selectedRequest && (

        <div
          className="request-overlay"
          onClick={() =>
            setSelectedRequest(
              null
            )
          }
        />

      )}


      {/* SIDE PANEL */}

      <aside
        className={`request-drawer ${
          selectedRequest
            ? "open"
            : ""
        }`}
      >

        {selectedRequest && (
          <>

            <div className="drawer-header">

              <div>

                <h2>
                  {
                    selectedRequest.name
                  }
                </h2>

                <p>
                  {
                    selectedRequest.company
                  }
                </p>

              </div>


              <div className="drawer-header-actions">

                <select
                  value={
                    selectedRequest.status
                  }
                  onChange={(e) =>
                    changeStatus(
                      e.target.value
                    )
                  }
                >
                  <option value="new">
                    Шинэ
                  </option>

                  <option value="contacted">
                    Холбогдсон
                  </option>

                  <option value="contract">
                    Гэрээ
                  </option>

                  <option value="active">
                    Идэвхтэй
                  </option>
                </select>


                <button
                  className="drawer-close"
                  onClick={() =>
                    setSelectedRequest(
                      null
                    )
                  }
                >
                  ×
                </button>

              </div>

            </div>


            <div className="drawer-details">

              <div>
                <span>Утас</span>
                <strong>
                  {
                    selectedRequest.phone
                  }
                </strong>
              </div>


              <div>
                <span>Имэйл</span>
                <strong>
                  {
                    selectedRequest.email
                  }
                </strong>
              </div>


              <div>
                <span>Систем</span>
                <strong>
                  {
                    selectedRequest.system_type ||
                    "-"
                  }
                </strong>
              </div>


              <div>
                <span>Загвар</span>

                <strong>
                  {selectedRequest.models
                    ?.length
                    ? selectedRequest.models.join(
                        ", "
                      )
                    : "-"}
                </strong>
              </div>


              <div>
                <span>Огноо</span>
                <strong>
                  {formatDate(
                    selectedRequest.created_at
                  )}
                </strong>
              </div>

            </div>


            <div className="drawer-notes">

              <h3>
                Тэмдэглэл
              </h3>


              <div className="notes-list">

                {selectedRequest.notes
                  ?.length ? (

                  selectedRequest.notes.map(
                    (item) => (

                      <div
                        className="note-item"
                        key={item.id}
                      >

                        <span>
                          {formatDate(
                            item.created_at
                          )}
                        </span>

                        <p>
                          {item.note}
                        </p>

                      </div>

                    )
                  )

                ) : (

                  <p className="no-notes">
                    Тэмдэглэл байхгүй.
                  </p>

                )}

              </div>

            </div>


            <div className="drawer-note-form">

              <input
                placeholder=
                  "Тэмдэглэл нэмэх..."
                value={note}
                onChange={(e) =>
                  setNote(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {

                  if (
                    e.key ===
                    "Enter"
                  ) {
                    addNote();
                  }

                }}
              />


              <button
                onClick={addNote}
              >
                Нэмэх
              </button>

            </div>

          </>
        )}

      </aside>

    </div>
  );
}

export default AdminRequests;