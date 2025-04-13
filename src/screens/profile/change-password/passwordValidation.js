export const validatePasswordChange = ({ oldPassword, newPassword, confirmPassword }) => {
    const errors = {};
  
    if (!oldPassword) {
      errors.oldPassword = 'Old password is required.';
    }
  
    if (!newPassword) {
      errors.newPassword = 'New password is required.';
    } else if (newPassword.length < 6) {
      errors.newPassword = 'New password must be at least 6 characters.';
    } else if (newPassword === oldPassword) {
      errors.newPassword = 'New password must be different from old password.';
    }
  
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password.';
    } else if (confirmPassword !== newPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
  
    return errors;
  };
  