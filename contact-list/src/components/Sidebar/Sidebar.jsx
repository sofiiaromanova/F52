import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Sidebar.scss"; 

const Sidebar = () => {
  // 1. Дістаємо контакти та статуси з Redux
  const contacts = useSelector((state) => state.contacts || []);
  const contactStatuses = useSelector((state) => state.contactStatuses || {});

  // Функція для підрахунку контактів певного статусу
  const getCount = (statusName) => {
    // Фільтруємо контакти, у яких статус співпадає з назвою
    const count = contacts.filter(
      (contact) => contact.status === statusName
    ).length;
    return count;
  };

  // Отримуємо список назв статусів (ключі об'єкта)
  const statusList = Object.keys(contactStatuses);

  return (
    <div className="sidebar bg-white p-3 shadow-sm" style={{ minHeight: "100vh", width: "250px" }}>
      <h3 className="text-center mb-4">Contacts</h3>
      
      <div className="d-grid gap-2 mb-4">
        <Link to="/new-contact" className="btn btn-primary">
          + New Contact
        </Link>
        <Link to="/contact-statuses" className="btn btn-outline-secondary">
          ⚙️ Manage Statuses
        </Link>
      </div>

      <h5 className="text-muted">Status Filters</h5>
      <ul className="list-group list-group-flush">
        
        {/* Виводимо "All Contacts" (загальна кількість) */}
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <span className="fw-bold">All Contacts</span>
          <span className="badge bg-secondary rounded-pill">
            {contacts.length}
          </span>
        </li>

        {/* Пробігаємось по всіх статусах з Redux */}
        {statusList.map((statusName) => {
          const statusData = contactStatuses[statusName];
          const count = getCount(statusName);

          return (
            <li 
              key={statusName} 
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Кольоровий кружечок */}
                <span 
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: statusData.bg,
                    borderRadius: "50%",
                    display: "inline-block"
                  }}
                ></span>
                {statusName}
              </span>

              {/* 🔢 Цифра кількості */}
              <span className="badge bg-light text-dark rounded-pill border">
                {count}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;