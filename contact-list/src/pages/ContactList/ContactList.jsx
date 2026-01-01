import ContactItem from "../../components/ContactItem/ContactItem";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function ContactList(){
  return(
    <main className="shadow bg-white container rounded mt-4">
      <div className="row">
        <div className="col-3">
          {/* <Sidebar/> */}
        </div>
        <div className="col-9">
          <ContactItem />
        </div>
      </div>
    </main>
  )
}