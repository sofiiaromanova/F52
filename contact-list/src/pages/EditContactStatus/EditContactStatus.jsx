import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useNavigate, useParams } from "react-router-dom";
import { statusesValidationSchema } from '../../validation/validation';

import { useDispatch, useSelector } from 'react-redux';
import { editStatus } from '../../redux/actions';

export default function EditContactStatus(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {statusName} = useParams()
  const status = useSelector(state => state.contactStatuses[statusName])

  if (!status) {
    return <div>Status not found</div>
  }

  const initialValues = {
    statusName: statusName,
    bg: status.bg,
  }

  const handleSubmit = (value) =>{
    dispatch(editStatus(statusName, value.statusName, value.bg))
    navigate('/contact-statuses')
  }

  return(
    <main className="shadow bg-white container rounded mt-4 addPage">
          <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={statusesValidationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <h1 className="text-center">Edit contact status</h1>
                <hr />
                <div className='m-4'>
                  <label htmlFor="statusName">Status name</label>
                  <Field className='form-control fs-5' type='text' name='statusName' id='statusName'/>
                  <ErrorMessage name='statusName' component='p' className='text-danger position-absolute'/>
                </div>
                <div className='m-4'>
                  <label className='form-input m-1 fs-4'  htmlFor="bg">Color</label>
                  <Field className='form-input m-1 fs-4' type='color' name='bg' id='bg'/>
                  <ErrorMessage name='bg' component='p' className='text-danger position-absolute'/>
                </div>
                <button type='submit' className='btn btn-primary btn-lg form-control' disabled={isSubmitting}>Save</button>
              </Form>
            )}
          </Formik>
    </main>
  )
}