import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateContact } from "../../redux/contactSlice";

import "../NewContact/NewContact.scss"; 

const UpdateContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts);
  

  const contactStatuses = useSelector((state) => state.contactStatuses || {});
  
  const currentContact = contacts.find((contact) => contact.id == id);

  const [name, setName] = useState(currentContact ? currentContact.firstName + " " + currentContact.lastName : "");
  const [email, setEmail] = useState(currentContact ? currentContact.email : "");
  const [phone, setPhone] = useState(currentContact ? currentContact.phone : "");
  const [status, setStatus] = useState(currentContact ? currentContact.status : "Work");

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameParts = name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    const updateData = {
      id: currentContact.id,
      firstName,
      lastName,
      email,
      phone,
      status, 
      avatar: currentContact.avatar,
      gender: currentContact.gender 
    };

    dispatch(updateContact({ 
        id: currentContact.id, 
        updatedContact: updateData 
    }));
    navigate("/");
  };

  if (!currentContact) {
    return <h2 className="text-center mt-5">Contact not found! 😕</h2>;
  }

  return (
    <div className="shadow bg-white container rounded mt-4 p-4 addPage">
      <h1 className="text-start">Edit Contact</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="m-4">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="m-4">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="m-4">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* 👇 2. ДИНАМІЧНИЙ СПИСОК СТАТУСІВ */}
        <div className="m-4">
          <label className="form-label">Status</label>
          <select 
            className="form-select" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >

            {Object.keys(contactStatuses).map((statusName) => (
              <option key={statusName} value={statusName}>
                {statusName}
              </option>
            ))}
            
            {/* Якщо раптом статус контакту старий і його вже немає в списку */}
            {!contactStatuses[status] && (
               <option value={status}>{status}</option>
            )}
          </select>
        </div>

        <div className="d-grid gap-2 m-4">
          <button type="submit" className="btn btn-primary btn-lg">
            Save Changes 
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateContact;