import * as Yup from 'yup';

// --- Rules for Contact Form ---
const nameRules = /^[a-zA-Z\s]+$/; // Only English letters
const phoneRules = /^\+?[0-9\s-]+$/; // Only digits

export const contactValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .matches(nameRules, 'Only letters are allowed')
    .min(2, 'Too short!')
    .max(30, 'Too long!')
    .required("First name is required"),

  lastName: Yup.string()
    .trim()
    .matches(nameRules, 'Only letters are allowed')
    .min(2, 'Too short!')
    .max(30, 'Too long!')
    .required("Last name is required"),

  phone: Yup.string()
    .trim()
    .matches(phoneRules, 'Phone number must contain digits only')
    .min(10, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .required("Phone number is required"),

  email: Yup.string()
    .trim()
    .email('Invalid email format')
    .required("Email is required"),

  avatar: Yup.string()
    .trim()
    .url('Must be a valid URL (http://...)')
    .required("Avatar URL is required"),

  gender: Yup.string()
    .oneOf(['men', 'women'], 'Invalid gender')
    .required("Please select a gender"),

  status: Yup.string()
    .required("Please select a status"),

  favorite: Yup.boolean(),
});



export const statusesValidationSchema = Yup.object().shape({
  statusName: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  bg: Yup.string()
    .required('Required'),
});