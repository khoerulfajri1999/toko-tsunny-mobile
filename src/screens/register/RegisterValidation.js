import { isValidEmail } from '../../shared/validations/formatValidations';

export const validateRegisterForm = (field, value, password = '') => {
  let errorMessage = '';

  switch (field) {
    case 'name':
      if (!value?.trim()) {
        errorMessage = 'Nama tidak boleh kosong!';
      }
      break;

    case 'email':
      if (!value?.trim()) {
        errorMessage = 'Email tidak boleh kosong!';
      } else if (!isValidEmail(value)) {
        errorMessage = 'Format email tidak valid!';
      }
      break;

    case 'password':
      if (!value) {
        errorMessage = 'Password tidak boleh kosong!';
      } else if (value.length < 6) {
        errorMessage = 'Password minimal 6 karakter!';
      }
      break;

    case 'password_confirm':
      if (!value) {
        errorMessage = 'Konfirmasi password tidak boleh kosong!';
      } else if (value !== password) {
        errorMessage = 'Konfirmasi password tidak cocok!';
      }
      break;

    default:
      break;
  }

  return errorMessage;
};
