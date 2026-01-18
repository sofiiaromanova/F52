import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteContact } from "../../redux/contactSlice";
import "./ContactItem.scss"; 

const ContactItem = () => {
  const dispatch = useDispatch();


  const contacts = useSelector((state) => state.contacts || []);
  const search = useSelector((state) => state.search || "");
  const contactStatuses = useSelector((state) => state.contactStatuses || {});


  const searchContacts = contacts.filter((contact) => {
    const firstName = contact.firstName || "";
    const lastName = contact.lastName || "";

    const fullName = (firstName + " " + lastName).toLowerCase();
    

    const searchText = (search || "").toLowerCase();
    return fullName.includes(searchText);
  });

  const handleDelete = (id) => {

    if (confirm("Are you sure you want to delete this contact?")) {
      dispatch(deleteContact(id));
    }
  };


  const getStatusStyle = (statusName) => {
    if (contactStatuses && contactStatuses[statusName]) {
      return { 
        backgroundColor: contactStatuses[statusName].bg, 
        color: "#ffffff" 
      };
    }
    return { backgroundColor: "#8ba3b8", color: "#ffffff" };
  };

  return (
    <div className="contact-grid">
      {searchContacts.map((contact) => {
        

        let imgUrl = contact.avatar;
        

        if (!imgUrl || String(imgUrl).indexOf("http") === -1) {
            

            let num = parseInt(contact.avatar);
            if (!num) num = parseInt(contact.id);
            if (!num) num = 1;
            num = num % 99;


            let gender = "men";
            if (contact.gender === "women") {
                gender = "women";
            }


            imgUrl = "https://randomuser.me/api/portraits/" + gender + "/" + num + ".jpg";
        }
        // ------------------------------------------

        return (
          <div key={contact.id} className="contact-card">
            <img
              src={imgUrl}
              alt="Avatar"
              onError={(e) => {
                e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
              }}
            />

            <h3>
              {contact.firstName} {contact.lastName}
            </h3>

            <div className="info-row">
              <span>📧</span> {contact.email || "No email"}
            </div>
            <div className="info-row">
              <span>📞</span> {contact.phone || "No phone"}
            </div>

            <span
              className="status-badge"
              style={getStatusStyle(contact.status)}
            >
              {contact.status || "Unknown"}
            </span>

            <div className="buttons">

              <Link to={"/update-contact/" + contact.id} className="btn-edit">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(contact.id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactItem;