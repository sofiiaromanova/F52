import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStatus } from "../../redux/actions";

const AddContactStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Стейт для даних форми
  const [name, setName] = useState("");
  const [bg, setBg] = useState("#000000");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStatus(name, bg));
    navigate("/contact-statuses");
  };

  return (

    <main className="shadow bg-white container rounded mt-4 addPage">
      <form onSubmit={handleSubmit}>
        
        <h1 className="text-center">Add contact status</h1>
        <hr />


        <div className="m-4">
          <label htmlFor="statusName">Status name</label>
          <input
            id="statusName"
            type="text"
            className="form-control fs-5" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>


        <div className="m-4">
          <label htmlFor="bg" className="form-input m-1 fs-4">Color</label>
          <input
            id="bg"
            type="color"
            className="form-input m-1 fs-4"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
          />
        </div>


        <button 
          type="submit" 
          className="btn btn-primary btn-lg form-control"
        >
          Save
        </button>
        
      </form>
    </main>
  );
};

export default AddContactStatus;