import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteContact } from '../../redux/actions';
import './ContactItem.scss';

export default function ContactItem() {
  const dispatch = useDispatch();
  
  const contacts = useSelector((state) => state.contacts);
  const search = useSelector((state) => state.search) || "";


  const statusColors = {
    work: "#198754",    
    family: "#dc3545",  
    private: "#ffc107", 
    friends: "#0dcaf0", 
    others: "#6c757d"   
  };

  const searchContacts = contacts.filter((contact) => {

    const fullName = (contact.firstName + " " + contact.lastName).toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      dispatch(deleteContact(id));
    }
  };


  const getStatusStyle = (statusName) => {

    const key = statusName ? statusName.toLowerCase() : 'others';
    

    const bgColor = statusColors[key] || statusColors['others'];


    const textColor = (key === 'private' || key === 'friends') ? '#000000' : '#ffffff';

    return { backgroundColor: bgColor, color: textColor };
  };

  return (
    <div className="contact-grid">
      {searchContacts.map((contact) => {
        let imgUrl = contact.avatar;
        
        if (!imgUrl || imgUrl.length < 5) {
             imgUrl = "https://i.pravatar.cc/150?u=" + contact.id;
        }

        return (
          <div key={contact.id} className="contact-card">
            <img 
              src={imgUrl} 
              alt="Avatar" 
              onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} 
            />
            
            <h3>{contact.firstName} {contact.lastName}</h3>
            
            <div className="info-row">
              <span>📧</span> {contact.email}
            </div>
            <div className="info-row">
              <span>📞</span> {contact.phone}
            </div>
            

            <span 
              className="status-badge" 
              style={getStatusStyle(contact.status)}
            >
               {contact.status}
            </span>

            <div className="buttons">
              <Link to={"/update-contact/" + contact.id} className="btn-edit">
                Edit 
              </Link>

              <button onClick={() => handleDelete(contact.id)} className="btn-delete">
                Delete 
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}