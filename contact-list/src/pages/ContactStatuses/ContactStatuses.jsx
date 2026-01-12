import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteStatus } from "../../redux/actions";

export default function ContactStatuses() {
  const statuses = useSelector((state) => state.contactStatuses);
  const dispatch = useDispatch();

  const handleDelete = (statusName) => {
    if (window.confirm(`Delete status "${statusName}"?`)) {
      dispatch(deleteStatus(statusName));
    }
  };

  return (
    <main className="shadow bg-white container rounded mt-4 p-4">
      <div className="row">
        <div className="col-12 mb-3">

          <Link
            to="/add-status"
            className="btn btn-success"
          >
            Add Status 
          </Link>
        </div>

        <div className="col-12">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th className="text-center" scope="col">Status name</th>
                <th className="text-center" scope="col">Color</th>
                <th className="text-center" scope="col">Contact count</th>
                <th className="text-center" scope="col">Edit/Del</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(statuses).map((status, index) => (
                <tr key={index}>
                  <td className="align-middle">{index + 1}</td>
                  <td className="fs-5 align-middle text-center">{status}</td>
                  <td className="align-middle text-center">
                    <span 
                      className="badge rounded-pill fs-6" 
                      style={{ backgroundColor: statuses[status].bg, padding: '10px' }}
                    >
                      {statuses[status].bg}
                    </span>
                  </td>
                  <td className="fs-5 align-middle text-center">
                    {statuses[status].count || 0}
                  </td>
                  <td className="text-center align-middle">
                    <div className="d-flex justify-content-center gap-2">
                      

                      <Link
                        to={`/edit-status/${status}`}
                        className="btn btn-primary btn-sm"
                      >
                        Edit 
                      </Link>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(status)}
                      >
                        Delete 
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}