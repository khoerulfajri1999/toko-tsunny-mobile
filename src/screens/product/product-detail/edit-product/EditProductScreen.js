import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style/EditProductScreen.style';
import EditProductForm from './EditProductForm';
import { useDispatch, useSelector } from 'react-redux';
import productService from '../../../../services/productService';
import { startLoading, stopLoading } from '../../../../store/slice/appSlice';
import { useFocusEffect } from '@react-navigation/native';

const EditProductScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [formData, setFormData] = useState(product);
  const loading = useSelector((state) => state.app.isLoading);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      setFormData(product);
    }, [product])
  );

  const handleSave = async (updatedData) => {
    const data = new FormData();
    data.append('name', updatedData.name);
    data.append('description', updatedData.description);
    data.append('stock', updatedData.stock.toString());
    data.append('price', updatedData.price.toString());
    data.append('category_id', updatedData.category_id.toString());

    if (updatedData.image && updatedData.image.uri) {
      const uri = updatedData.image.uri;
      const filename = uri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename || '');
      const type = match ? `image/${match[1]}` : `image`;

      data.append('image', {
        uri,
        name: filename,
        type,
      });
    }

    try {
      dispatch(startLoading());
      await productService.updateProduct(product.id, data);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update product:', error);
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
        <Text style={styles.headerText}>Edit Product</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <EditProductForm
          initialData={formData}
          onSave={handleSave}
          loading={loading}
        />
      </ScrollView>
    </View>
  );
};

export default EditProductScreen;
