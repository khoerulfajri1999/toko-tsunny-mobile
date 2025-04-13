import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { validateChangeProfileForm } from "./changeProfileValidation";
import InputField from "../../../shared/components/input/InputField";
import Button from "../../../shared/components/button/Button";
import styles from "./style/ChangeProfileForm.style";
import { Ionicons } from "@expo/vector-icons";

const ChangeProfileForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    const error = validateChangeProfileForm(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  useEffect(() => {
    setIsFormValid(
      Object.values(formData).every((value) => value.trim() !== "") &&
      Object.values(errors).every((error) => error === "")
    );
  }, [formData, errors]);

  return (
    <View>

    {/* Profile Picture */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: "https://imgs.search.brave.com/uLARhH16ug7xgUl3msl3yHs0DCWkofOAnLVeWQ-poy0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzI1Mi0y/NTI0Njk1X2R1bW15/LXByb2ZpbGUtaW1h/Z2UtanBnLWhkLXBu/Zy1kb3dubG9hZC5w/bmc"}} 
          style={styles.profileImage} 
        />
        <TouchableOpacity style={styles.cameraIcon}>
          <Ionicons name="camera" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {[
        { label: "Name", field: "name", keyboardType: "default" },
        { label: "Mobile phone number", field: "phoneNumber", keyboardType: "phone-pad" },
        { label: "Email", field: "email", keyboardType: "email-address", editable: false },
        { label: "Address", field: "address", keyboardType: "default" }
      ].map(({ label, field, keyboardType, editable = true }) => (
        <InputField
          key={field}
          label={label}
          placeholder={`Enter ${label.toLowerCase()}`}
          value={formData[field]}
          keyboardType={keyboardType}
          onChangeText={(text) => handleChange(field, text)}
          error={errors[field]}
          editable={editable}
        />
      ))}

      <Button title="Save" onPress={() => onSave(formData)} disabled={!isFormValid} />
    </View>
  );
};

export default ChangeProfileForm;
