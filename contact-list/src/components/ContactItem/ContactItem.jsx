import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteContact } from "../../redux/actions";

export default function ContactItem(){
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.contacts)
  const searchContacts = contacts
  // const searchContacts = stor.search ? stor.contacts.filter(contact => 
  //   `${contact.firstName.toLowerCase()} ${contact.lastName.toLowerCase()}`
  //   .includes(stor.search.toLowerCase())) : stor.contacts 

  return(
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col"></th>
          <th className="text-center" scope="col">Name</th>
          <th className="text-center" scope="col">Email/Phone</th>
          <th className="text-center" scope="col">Status</th>
          <th className="text-center" scope="col">Edit/Del</th>
        </tr>
      </thead>
      <tbody>
        {searchContacts.map(contact => (
          <tr key={contact.id}>
            <td><img className="rounded-circle" src={`https://randomuser.me/api/portraits/${contact.gender}/${contact.avatar}.jpg`} alt="avatar" /></td>
            <td className="fs-5 align-middle text-center">{contact.firstName}<br/>{contact.lastName}</td>
            <td className="fs-5 align-middle text-center">{contact.email}<br/>{contact.phone}</td>
            <td className="fs-6 align-middle text-center">{contact.status.toUpperCase()}</td>
            <td className="fs-5 align-middle text-center">
              <Link to={`/update-contact/${contact.id}`}><button>Edit</button></Link>
              <button onClick={() => dispatch(deleteContact(contact.id))}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}