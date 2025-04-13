import { isValidEmail, isValidName, isValidPhoneNumber, isValidAddress } from "../../../shared/validations/formatValidations";

export const validateChangeProfileForm = (field, value) => {
  let errorMessage = "";

  switch (field) {
    case "name":
      if (!value) {
        errorMessage = "Nama tidak boleh kosong!";
      } else if (!isValidName(value)) {
        errorMessage = "Nama hanya boleh mengandung huruf dan spasi!";
      }
      break;

    case "phoneNumber":
      if (!value) {
        errorMessage = "Nomor telepon tidak boleh kosong!";
      } else if (!isValidPhoneNumber(value)) {
        errorMessage = "Nomor telepon harus valid dan sesuai format!";
      }
      break;

    case "email":
      if (!value) {
        errorMessage = "Email tidak boleh kosong!";
      } else if (!isValidEmail(value)) {
        errorMessage = "Format email tidak valid!";
      }
      break;

    case "address":
      if (!value) {
        errorMessage = "Alamat tidak boleh kosong!";
      } else if (!isValidAddress(value)) {
        errorMessage = "Alamat minimal harus 5 karakter!";
      }
      break;

    default:
      break;
  }

  return errorMessage;
};
