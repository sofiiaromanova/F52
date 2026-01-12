import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

// Імпорти
import ContactList from "./pages/ContactList/ContactList";
import NewContact from "./pages/NewContact/NewContact";
import UpdateContact from "./pages/UpdateContact/UpdateContact";
import NotFound from "./pages/NotFound/NotFound";
import Header from './components/Header/Header';
import ContactStatuses from './pages/ContactStatuses/ContactStatuses';
import AddContactStatus from './pages/AddContactStatus/AddContactStatus';
import EditContactStatus from './pages/EditContactStatus/EditContactStatus';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <Routes>
          {/* Контакти */}
          <Route path="/" element={<ContactList/>}/>
          <Route path="/new-contact" element={<NewContact/>}/>
          <Route path="/update-contact/:id" element={<UpdateContact/>}/>
          
          {/* --- СТАТУСИ  --- */}
          
          {/* 1. Головний список  */}
          <Route path="/contact-statuses" element={<ContactStatuses/>}/>
          
          {/* 2. Додавання */}
          <Route path="/add-status" element={<AddContactStatus/>}/>
          
          {/* 3. Редагування */}
          <Route path="/edit-status/:statusName" element={<EditContactStatus/>}/>
          
          {/* Помилка */}
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;