import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';

export default function Header({searchBySymbols}) {
  return (
    <Navbar expand="lg"  className="shadow bg-white container rounded mt-3">
      <Container fluid>
        <div>
          <Link className='navbar-brand fs-4' to={'/'}>Contact List</Link>
          <Link className='navbar-brand fs-4' to={'/new-contact'}>Add Contact</Link>
          <Link className='navbar-brand fs-4' to={'/contact-statuses'}>Statuses</Link>
        </div>
        
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={e => searchBySymbols(e.target.value)}
          />
        </Form>
      </Container>
    </Navbar>
  );
}