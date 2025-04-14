import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style/ProductFormScreen.style';
import ProductForm from './ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../../../../store/slice/appSlice';
import productService from '../../../../services/productService';

const ProductFormScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.isLoading);

  const handleSave = async (formData) => {
    try {
      dispatch(startLoading());

      const multipart = new FormData();
      multipart.append('name', formData.name);
      multipart.append('description', formData.description);
      multipart.append('stock', formData.stock);
      multipart.append('price', formData.price);
      multipart.append('category_id', formData.category_id);

      if (formData.image && formData.image.uri) {
        const uri = formData.image.uri;
        const filename = uri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : 'image';

        multipart.append('image', {
          uri,
          name: filename,
          type,
        });
      }

      await productService.createProduct(multipart);
      navigation.goBack();
    } catch (err) {
      console.error('Failed to create product:', err);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Tambah Produk</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <ProductForm onSave={handleSave} loading={loading} />
      </ScrollView>
    </View>
  );
};

export default ProductFormScreen;
