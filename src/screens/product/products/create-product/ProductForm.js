import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View ,Text} from 'react-native';
import styles from './style/ProductForm.style';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import InputField from '../../../../shared/components/input/InputField';
import Button from '../../../../shared/components/button/Button';
import categoryService from '../../../../services/categoryService';
import { Picker } from '@react-native-picker/picker';

const ProductForm = ({ onSave, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    stock: '',
    price: '',
    category_id: '',
    image: null,
  });

  const [categories, setCategories] = useState([]); // Menyimpan daftar kategori
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Mengambil data kategori dari API
  const getAllCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response); // Menyimpan kategori di state
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

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              formData.image?.uri ||
              'https://dummyimage.com/100x100/cccccc/ffffff&text=No+Image',
          }}
          style={styles.image}
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
        <InputField
          key={field}
          label={label}
          placeholder={`Masukkan ${label}`}
          value={formData[field]}
          onChangeText={(text) => handleChange(field, text)}
          error={errors[field]}
          keyboardType={keyboardType}
        />
      ))}

      {/* Dropdown untuk kategori */}
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
        title="Simpan Produk"
        onPress={() => onSave(formData)}
        disabled={!isFormValid}
        loading={loading}
      />
    </View>
  );
};

export default ProductForm;
