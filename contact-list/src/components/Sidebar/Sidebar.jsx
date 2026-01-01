import { useSelector } from "react-redux";

export default function Sidebar(){
  const contacts = useSelector(state => state.contacts)
  const statusCounts = {
    work: 0,
    family: 0,
    private: 0,
    friends: 0,
    others: 0,
  }

  contacts.forEach(contact => {
    statusCounts[contact.status] += 1
  });

  const totalContacts = contacts.length

  return(
    <aside className="container border-end">
      <div className="row">
        <div className="col-12">
          <div className="contacts-labels">
            <div className="title">
              All contact<span>{totalContacts}</span>
            </div>
            <div className="list">
              <div className="unit">
                <div className="lab lab-success">Work</div>
                <span>{statusCounts.work}</span>
              </div>
              <div className="unit">
                <div className="lab lab-primary">Family</div>
                <span>{statusCounts.family}</span>
              </div>
              <div className="unit">
                <div className="lab lab-danger">Private</div>
                <span>{statusCounts.private}</span>
              </div>
              <div className="unit">
                <div className="lab lab-warning">Friends</div>
                <span>{statusCounts.friends}</span>
              </div>
              <div className="unit">
                <div className="lab lab-warning">Others</div>
                <span>{statusCounts.others}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}