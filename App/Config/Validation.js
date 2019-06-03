import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Incorect format, please follow the guideline.'),
  password: yup
    .string()
    .required('Password is required')
})

export const signUpSchema = yup.object().shape({
  first_name: yup
    .string()
    .required('First Name is required'),
  last_name: yup
    .string()
    .required('Last Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Incorect format, please follow the guideline.'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/m, 'Invalid Phone Number'),
  plate_number: yup
    .string()
    .required('Plate number is required'),
  vehicle_type: yup
    .string()
    .required('Vehicle type is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, "Must be at least 8 characters"),
  repeat_password: yup
    .string()
    .required('Confirm Password is required')
    .min(8, "Must be at least 8 characters"),
    
})

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Incorect format, please follow the guideline.')
})

export const newPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('New Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
})

export const confirmAccountSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Incorect format, please follow the guideline.'),
  confirmation_token: yup
    .string()
    .required('Confirmation code is required')
})