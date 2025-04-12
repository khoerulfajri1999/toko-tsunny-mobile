import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import styles from "./Button.style";

const Button = ({ title, onPress, loading, disabled }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { opacity: disabled ? 0.5 : 1 }]}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default Button;
