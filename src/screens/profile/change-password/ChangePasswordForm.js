import React, { useState } from "react";
import { View } from "react-native";
import InputField from "../../../shared/components/input/InputField";
import styles from "./style/ChangePasswordForm.style";
import Button from "../../../shared/components/button/Button";

const ChangePasswordForm = ({ formData, errors, onChange, onSubmit, isFormValid, loading }) => {
  const [secureTextEntry, setSecureTextEntry] = useState({
    oldPassword: true,
    newPassword: true,
    confirmPassword: true,
  });

  const handleToggleSecure = (field) => {
    setSecureTextEntry((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <View style={styles.content}>
      <InputField 
        placeholder="Old Password" 
        secureTextEntry={secureTextEntry.oldPassword} 
        // value={formData.oldPassword} 
        onChangeText={(text) => onChange("oldPassword", text)}  
        onToggleSecure={() => handleToggleSecure("oldPassword")}
        // error={errors.oldPassword}
      />
      <InputField 
        placeholder="New Password" 
        secureTextEntry={secureTextEntry.newPassword} 
        value={formData.newPassword} 
        onChangeText={(text) => onChange("newPassword", text)}  
        onToggleSecure={() => handleToggleSecure("newPassword")}
        error={errors.newPassword}
      />
      <InputField 
        placeholder="Confirm New Password" 
        secureTextEntry={secureTextEntry.confirmPassword} 
        value={formData.confirmPassword} 
        onChangeText={(text) => onChange("confirmPassword", text)}  
        onToggleSecure={() => handleToggleSecure("confirmPassword")}
        error={errors.confirmPassword}
      />

      <Button 
        title="Save" 
        onPress={onSubmit} 
        loading={loading} 
        disabled={!isFormValid} 
      />
    </View>
  );
};

export default ChangePasswordForm;
