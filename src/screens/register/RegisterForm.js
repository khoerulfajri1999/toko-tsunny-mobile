import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import InputField from '../../shared/components/input/InputField';
import Button from '../../shared/components/button/Button';
import { SCREEN_PATH } from '../../navigation/PathNavigator';
import styles from './style/RegisterForm.style';

const RegisterForm = ({
  formData,
  errors,
  securePassword,
  secureConfirmPassword,
  onTogglePassword,
  onToggleConfirmPassword,
  onChange,
  onRegister,
  isFormValid,
  navigation,
}) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.appTitle}>DAFTAR</Text>

      <InputField
        placeholder="Nama"
        value={formData.name}
        onChangeText={(text) => onChange('name', text)}
        error={errors.name}
      />
      <InputField
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => onChange('email', text)}
        error={errors.email}
      />
      <InputField
        placeholder="Kata Sandi"
        secureTextEntry={securePassword}
        onToggleSecure={onTogglePassword}
        value={formData.password}
        onChangeText={(text) => onChange('password', text)}
        error={errors.password}
      />
      <InputField
        placeholder="Konfirmasi Kata Sandi"
        secureTextEntry={secureConfirmPassword}
        onToggleSecure={onToggleConfirmPassword}
        value={formData.password_confirm}
        onChangeText={(text) => onChange('password_confirm', text)}
        error={errors.password_confirm}
      />

      <Button title="Daftar" onPress={onRegister} disabled={!isFormValid} />

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Sudah punya akun?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_PATH.LOGIN)}
        >
          <Text style={styles.registerLink}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterForm;
