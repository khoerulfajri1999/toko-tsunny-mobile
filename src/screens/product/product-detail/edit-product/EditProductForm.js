import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import styles from './style/EditProductForm.style';
import InputField from '../../../../shared/components/input/InputField';
import Button from '../../../../shared/components/button/Button';

const EditProductForm = ({ initialData, onSave, loading }) => {
  const [formData, setFormData] = useState(initialData);
  const [isFormValid, setIsFormValid] = useState(true);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setFormData((prev) => ({
        ...prev,
        image: {
          uri: asset.uri,
          name: asset.fileName ?? 'product.jpg',
          type: asset.type ?? 'image/jpeg',
        },
      }));
    }
  };

  return (
    <View>
      <View style={styles.productImageContainer}>
        <Image
          source={{
            uri:
              formData.image?.uri ||
              formData.image_url ||
              'https://via.placeholder.com/100',
          }}
          style={styles.productImage}
        />
        <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
          <Ionicons name="camera" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {[
        { label: 'Name', field: 'name', keyboardType: 'default' },
        { label: 'Description', field: 'description', keyboardType: 'default' },
        { label: 'Stock', field: 'stock', keyboardType: 'numeric' },
        { label: 'Price', field: 'price', keyboardType: 'numeric' },
        { label: 'Category ID', field: 'category_id', keyboardType: 'numeric' },
      ].map(({ label, field, keyboardType }) => (
        <InputField
          key={field}
          label={label}
          placeholder={`Enter ${label.toLowerCase()}`}
          value={String(formData[field] ?? '')}
          keyboardType={keyboardType}
          onChangeText={(text) =>
            handleChange(
              field,
              keyboardType === 'numeric' ? parseInt(text) || 0 : text
            )
          }
        />
      ))}

      <Button
        title="Simpan"
        onPress={() => onSave(formData)}
        disabled={!isFormValid}
        loading={loading}
      />
    </View>
  );
};

export default EditProductForm;
