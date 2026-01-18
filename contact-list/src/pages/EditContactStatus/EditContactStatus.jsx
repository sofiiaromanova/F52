import React, { useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editStatus } from "../../redux/contactSlice";

const EditContactStatus = () => {
  const { statusName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contactStatuses = useSelector((state) => state.contactStatuses);
  const currentStatus = contactStatuses[statusName];


  const [name, setName] = useState(statusName || "");
  const [bg, setBg] = useState(currentStatus ? currentStatus.bg : "#000000");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editStatus({ 
      oldStatus: statusName,
      newStatus: name,
      newBg: bg
    }));
    navigate("/contact-statuses");
  };

  if (!currentStatus) {
    return <h2 className="text-center mt-5">Status not found! 😕</h2>;
  }

  return (
    <div className="shadow bg-white container rounded mt-4 p-4 addPage">
      <h1 className="text-center">Edit Contact Status</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="m-4">
          <label className="form-label fs-4">Status Name</label>
          <input
            type="text"
            className="form-control fs-5"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="m-4">
          <label className="form-label fs-4 d-block">Color</label>
           <input
            type="color"
            className="form-input m-1 fs-4" 
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            title="Choose your color"
            style={{ cursor: "pointer" }} 
          />
        </div>
        <div className="d-grid gap-2 m-4">
          <button type="submit" className="btn btn-primary btn-lg">
            Save Changes
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate("/contact-statuses")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContactStatus;