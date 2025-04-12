export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  export const isValidName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/; // Hanya huruf dan spasi
    return nameRegex.test(name);
  };
  
  export const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/; // Format Indonesia +62 atau 08
    return phoneRegex.test(phoneNumber);
  };

  export const isValidAddress = (address) => {
    return address.length > 5; // Minimal 5 karakter untuk alamat
  };