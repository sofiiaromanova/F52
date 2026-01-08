import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateContact } from "../../redux/actions"; 
// Если у тебя есть файл стилей NewContact.scss в этой папке, он подключится. 
// Если нет - просто удали строку ниже, но bootstrap классы и так сделают красиво.
import "../NewContact/NewContact.scss"; 

const UpdateContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts);
  
  // Ищем контакт по ID
  const currentContact = contacts.find((contact) => contact.id == id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Work");

  // Заполняем форму данными при загрузке
  useEffect(() => {
    if (currentContact) {
      setName(currentContact.firstName + " " + currentContact.lastName);
      setEmail(currentContact.email);
      setPhone(currentContact.phone);
      setStatus(currentContact.status || "others");
    }
  }, [currentContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameParts = name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    const updatedData = {
      id: currentContact.id,
      firstName,
      lastName,
      email,
      phone,
      status,
      avatar: currentContact.avatar
    };

    dispatch(updateContact(updatedData));
    navigate("/");
  };

  if (!currentContact) {
    return <h2 className="text-center mt-5">Contact not found! 😕</h2>;
  }

  return (
    <div className="shadow bg-white container rounded mt-4 p-4 addPage">
      <h1 className="text-start">Edit Contact </h1>
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

        <div className="m-4">
          <label className="form-label">Status</label>
          <select 
            className="form-select" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Work">Work</option>
            <option value="Family">Family</option>
            <option value="Private">Private</option>
            <option value="Friends">Friends</option>
            <option value="others">Others</option>
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