import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import ChangePasswordForm from "./ChangePasswordForm";
import { validatePasswordChange } from "./passwordValidation";
import styles from "./style/ChangePasswordScreen.style";

const ChangePasswordScreen = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    const error = validatePasswordChange(field, value, formData);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  useEffect(() => {
    setIsFormValid(
      Object.values(errors).every((e) => e === "") &&
      Object.values(formData).every((value) => value !== "")
    );
  }, [formData, errors]);

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "Password updated successfully!");
    }, 2000);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Change Password</Text>
        </View>
        <ChangePasswordForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
          loading={loading}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ChangePasswordScreen;
