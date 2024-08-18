import * as Yup from 'yup';
import { isYupError, parseYupError } from '@/utils/Yup';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,3}$/i;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[~!@#$%^&*()/_=+[\]{}|;:,.<>?-])(?=.*[0-9])(?=.*[a-z]).{8,40}$/;

export const validateData = async (schema, inputData) => {
  return await schema
    .validate(inputData, {
      abortEarly: false,
    })
    .then(() => [true, null])
    .catch((err) => {
      if (isYupError(err)) {
        return [false, parseYupError(err)];
      }
      return [false, null];
    });
};

// Login Validation
export const signInValidationSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, 'Please enter valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Only accept One Uppercase and atleast one special characters and numbers',
    ),
});

export const validateForm = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  fatherName: Yup.string().required('Father Name is required'),
  currentAddress: Yup.string().required('Current Address is required'),
  permanentAddress: Yup.string().required('Permanent Address is required'),
  contactNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Contact Number must be digits')
    .required('Contact Number is required'),
  alternateNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Alternate Number must be digits')
    .required('Alternate Number is required'),
  emergencyNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Emergency Number must be digits')
    .required('Emergency Number is required'),
  emailId: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  relativeName: Yup.string().required('Relative Name is required'),
  relativeRelation: Yup.string().required('Relative Relation is required'),
  relativeNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Relative Number must be digits')
    .required('Relative Number is required'),
  currentWorkingCompanyName: Yup.string().required(
    'Current Working Company name is required',
  ),
  companyAddress: Yup.string().required('Company Address is required'),
  companyContactNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Company Contact Number must be digits')
    .required('Company Contact Number is required'),
  contactPersonName: Yup.string().required('Contact Person Name is required'),
  insuranceStatus: Yup.string()
    .oneOf(['new_customer', 'existing_customer'], 'Invalid Insurance Status')
    .required('Insurance Status is required'),
  agentName: Yup.string().required('Agent Name is required'),
  agentEmployeeId: Yup.string().required('Agent Employee Id is required'),
  verifyExecutive: Yup.string().required('Verify Executive is required'),
  verifyName: Yup.string().required('Verify Name is required'),
  verifyEmployeeId: Yup.string().required('Verify Employee Id is required'),
  verifyNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Verify Number must be digits')
    .required('Verify Number is required'),
  finalStatus: Yup.string()
    .oneOf(
      ['verification_complete', 'incomplete_verification', 'file_rejected'],
      'Invalid Final Status',
    )
    .required('Final Status is required'),
  insurancePrice: Yup.string()
    .matches(/^[0-9]+$/, 'Insurance Price must be digits')
    .required('Insurance Price is required'),
  remark: Yup.string().required('Remark is required'),
});
