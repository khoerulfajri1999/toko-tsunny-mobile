import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ChangeProfileForm from './ChangeProfileForm';
import styles from './style/ChangeProfileScreen.style';
import { useDispatch, useSelector } from 'react-redux';
import userService from '../../../services/userService';
import { setUser } from '../../../store/slice/userSlice';
import { startLoading, stopLoading } from '../../../store/slice/appSlice';

const ChangeProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.app.isLoading);
  const [formData, setFormData] = useState(user); 
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData(user); // Update formData saat user berubah di Redux
  }, [user]);
  

  const handleSave = async (updatedData) => {
    const formData = new FormData();
    formData.append('name', updatedData.name);
    formData.append('email', updatedData.email);
    formData.append('phone', updatedData.phone_number);

      if (updatedData.image && updatedData.image.uri) {
        const uri = updatedData.image.uri;
        const filename = uri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : `image`;

        formData.append('image', {
          uri,
          name: filename,
          type,
        });
      }
    try {
      dispatch(startLoading())
      const result = await userService.updateUser(user.id, formData);
      console.log(result);

      dispatch(setUser(result));
      navigation.goBack();
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      dispatch(stopLoading())
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Change Profile</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ChangeProfileForm initialData={formData} onSave={handleSave} loading={loading} />
      </ScrollView>
    </View>
  );
};

export default ChangeProfileScreen;
