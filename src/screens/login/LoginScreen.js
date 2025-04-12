import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Alert,
} from 'react-native';
import styles from './style/LoginScreen.style';
import LoginForm from './LoginForm';
import { validateLoginForm } from './loginValidation';
import { useAuth } from '../../context/authContext';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    const error = validateLoginForm(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  useEffect(() => {
    setIsFormValid(
      formData.email !== '' &&
        formData.password !== '' &&
        Object.values(errors).every((e) => e === '')
    );
  }, [formData, errors]);

  const handleLogin = async () => {
    if (!isFormValid) {
      Alert.alert(
        'Login Gagal',
        'Silahkan isi email dan password dengan benar!'
      );
      return;
    }

    const isSuccess = await login(formData.email, formData.password);
    if (!isSuccess) {
      Alert.alert('Login Gagal', 'Email atau password salah!');
    }
  };

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 70}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section with Orange Background */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Login</Text>
          </View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../shared/assets/login.png')}
            />
          </View>
          <LoginForm
            formData={formData}
            errors={errors}
            secureTextEntry={secureTextEntry}
            onToggleSecure={() => setSecureTextEntry(!secureTextEntry)}
            onChange={handleChange}
            onLogin={handleLogin}
            isFormValid={isFormValid}
            navigation={navigation}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
