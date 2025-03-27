import * as yup from 'yup';

export const getCodeSchema = yup.object().shape({
  phone: yup.string().required('Phone is required'),
});

export const LoginSchema = yup.object().shape({
  phone: yup.string().required('Phone is required'),
  code: yup.string().length(6, 'Code must be 6 length').required('Code is required'),
});
