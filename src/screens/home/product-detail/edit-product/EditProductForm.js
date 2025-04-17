import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import styles from './style/EditProductForm.style';
import InputField from '../../../../shared/components/input/InputField';
import Button from '../../../../shared/components/button/Button';
import categoryService from '../../../../services/categoryService';
import { Picker } from '@react-native-picker/picker';

const EditProductForm = ({ initialData, onSave, loading }) => {
  const [formData, setFormData] = useState(initialData);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: value ? '' : 'Wajib diisi' }));
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

  const getAllCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const isValid =
      Object.values(formData).every(
        (val) => val !== '' || typeof val === 'object'
      ) && Object.values(errors).every((err) => err === '');

    setIsFormValid(isValid);
  }, [formData, errors]);

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
        { label: 'Nama Produk', field: 'name' },
        { label: 'Deskripsi', field: 'description' },
        { label: 'Stok', field: 'stock', keyboardType: 'numeric' },
        { label: 'Harga', field: 'price', keyboardType: 'numeric' },
      ].map(({ label, field, keyboardType }) => (
        <View key={field}>
          <Text style={styles.label}>{label} : </Text>
          <InputField
            label={label}
            placeholder={`Masukkan ${label}`}
            value={String(formData[field] ?? '')}
            onChangeText={(text) =>
              handleChange(
                field,
                keyboardType === 'numeric' ? parseInt(text) || 0 : text
              )
            }
            error={errors[field]}
            keyboardType={keyboardType}
          />
        </View>
      ))}

      {/* Dropdown Kategori */}
      <Text style={styles.label}>Kategori : </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.category_id}
          onValueChange={(itemValue) => handleChange('category_id', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pilih Kategori" value="" />
          {categories.map((category) => (
            <Picker.Item
              key={category.id}
              label={category.name}
              value={category.id}
            />
          ))}
        </Picker>
      </View>
      {errors.category_id && (
        <Text style={styles.errorText}>{errors.category_id}</Text>
      )}

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
