import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const errorsObject: Errors = {};

  err.inner.forEach(error => (errorsObject[error.path || 'NoPathError'] = error.message));

  return errorsObject;
}
