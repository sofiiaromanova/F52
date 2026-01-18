import './NewContact.scss';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {v4 as uuidv4} from 'uuid'
import { useNavigate } from "react-router-dom";
import { contactValidationSchema } from '../../validation/validation';

import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactSlice';

export default function NewContact(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const contactStatuses = useSelector(state => state.contactStatuses)

  const initialValues = {
    id: uuidv4(),
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    avatar: '',
    gender: '',
    status: '',
    favorite: '',
  }

  const handleSubmit = (value) =>{
    dispatch(addContact(value))
    navigate('/')
  }

  return(
    <main className="shadow bg-white container rounded mt-4 addPage">
          <Formik initialValues={initialValues} validationSchema={contactValidationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <h1 className="text-center">Add new contact</h1>
                <hr />
                <div className='m-4'>
                  <label htmlFor="firstName">First name</label>
                  <Field className='form-control fs-5' type='text' name='firstName' id='firstName'/>
                  <ErrorMessage name='firstName' component='p' className='text-danger position-absolute'/>
                </div>
                <div className='m-4'>
                  <label htmlFor="lastName">Last name</label>
                  <Field className='form-control fs-5' type='text' name='lastName' id='lastName'/>
                  <ErrorMessage name='lastName' component='p' className='text-danger position-absolute'/>
                </div>
                <div className='m-4'>
                  <label htmlFor="phone">Phone</label>
                  <Field className='form-control fs-5' type='text' name='phone' id='phone'/>
                  <ErrorMessage name='phone' component='p' className='text-danger position-absolute'/>
                </div>
                <div className='m-4'>
                  <label htmlFor="email">Email</label>
                  <Field className='form-control fs-5' type='text' name='email' id='email'/>
                  <ErrorMessage name='email' component='p' className='text-danger position-absolute'/>
                </div>
                <div className='m-4'>
                  <label htmlFor="avatar">Avatar</label>
                  <Field className='form-control fs-5' type='text' name='avatar' id='avatar'/>
                  <ErrorMessage name='avatar' component='p' className='text-danger position-absolute'/>
                </div>
                <div className='m-4'>
                  <label htmlFor="gender">Gender</label>
                  <Field className='form-control fs-5' as='select' name='gender' id='gender'>
                    <option value="">Choose gender</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                  </Field>
                  <ErrorMessage name='gender' component='p' className='text-danger position-absolute'/>
                </div>
                <div className='m-4'>
                  <label htmlFor="status">Status</label>
                  <Field className='form-control fs-5' as='select' name='status' id='status'>
                    <option value="">Choose status</option>
                    {Object.keys(contactStatuses).map((status, index) => (
                      <option style={{backgroundColor: contactStatuses[status].bg}} key={index} value={status}>{status}</option>
                    ))}
                  </Field>
                  <ErrorMessage name='status' component='p' className='text-danger position-absolute'/>
                </div>
                <div className='m-4'>
                  <label className='form-check-label fs-5' htmlFor="favorite">Favorite</label>
                  <Field className='form-check-input m-1 fs-4' type='checkbox' name='favorite' id='favorite'/>
                </div>
                <button type='submit' className='btn btn-primary btn-lg form-control' disabled={isSubmitting}>Save</button>
              </Form>
            )}
          </Formik>
    </main>
  )
}