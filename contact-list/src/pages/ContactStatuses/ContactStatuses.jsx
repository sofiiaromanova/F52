import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ContactStatuses(){
  const statuses = useSelector(state => state.contactStatuses)

  return(
     <main className="shadow bg-white container rounded mt-4">
       <div className="row">
        <div className="col-12">
          <Link to={'/contact-statues/add-contact-status'} type="button" className="btn btn-success m-2 btn-lg">ADD STATUS</Link>
              <table className="table table-striped">
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
                      <td className="fs-5 align-middle text-center">{++index}</td>
                      <td className="fs-5 align-middle text-center">{status}</td>
                      <td style={{backgroundColor: statuses[status].bg}} className="fs-6 align-middle text-center">
                        {statuses[status].bg}
                      </td>
                      <td className="fs-5 align-middle text-center">000</td>
                      <td className="fs-5 align-middle text-center">
                        <Link to={`/contact-statuses/edit-contact/${status}`}><button>Edit</button></Link>
                        <button >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
        </div>
       </div>
     </main>
  )
}