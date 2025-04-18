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
import { useAuth } from '../../context/authContext';
import styles from './style/RegisterScreen.style';
import RegisterForm from './RegisterForm';
import { validateRegisterForm } from './RegisterValidation';
import authService from '../../services/authService';
import { SCREEN_PATH } from '../../navigation/PathNavigator';

const RegisterScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirm: ''
  });
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    const password = field === 'password_confirm' ? formData.password : '';
    const error = validateRegisterForm(field, value, password);

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  useEffect(() => {
    setIsFormValid(
      formData.name !== '' &&
      formData.email !== '' &&
        formData.password !== '' &&
        formData.password_confirm !== '' &&
        Object.values(errors).every((e) => e === '')
    );
  }, [formData, errors]);

  const handleRegister = async () => {
    if (!isFormValid) {
      Alert.alert(
        'Register Gagal',
        'Silahkan isi form dengan benar!'
      );
      return;
    }
    
    const isSuccess = await authService.register(formData.name, formData.email, formData.password, formData.password_confirm);
    if (!isSuccess) {
      Alert.alert('Register Gagal', 'Ada kesalahan dalam pengisian form!');
    } else {
      navigation.navigate(SCREEN_PATH.LOGIN)
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
              source={require('../../shared/assets/login1.png')}
            />
          </View>
          <RegisterForm
            formData={formData}
            errors={errors}
            securePassword={securePassword}
            secureConfirmPassword={secureConfirmPassword}
            onTogglePassword={() => setSecurePassword(!securePassword)}
            onToggleConfirmPassword={() =>
              setSecureConfirmPassword(!secureConfirmPassword)
            }
            onChange={handleChange}
            onRegister={handleRegister}
            isFormValid={isFormValid}
            navigation={navigation}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
