import {
  isValidEmail,
} from "../../shared/validations/formatValidations";

export const validateLoginForm = (field, value, password = "") => {
  let errorMessage = "";

  switch (field) {
    case "email":
      if (!value) {
        errorMessage = "Email tidak boleh kosong!";
      } else if (!isValidEmail(value)) {
        errorMessage = "Format email tidak valid!";
      }
      break;

    case "password":
      if (!value) {
        errorMessage = "Password tidak boleh kosong!";
      }
      break;

    default:
      break;
  }

  return errorMessage;
};
