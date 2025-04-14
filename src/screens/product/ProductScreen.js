import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import styles from './ProductScreen.style';
import { useDispatch, useSelector } from 'react-redux';
import productService from '../../services/productService';
import { startLoading, stopLoading } from '../../store/slice/appSlice';
import CategoryCarousel from './categories/CategoryCarousel';
import ProductList from './products/ProductList';
import { ActivityIndicator } from 'react-native';

const ProductScreen = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const isLoading = useSelector((state) => state.app.loading);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    dispatch(startLoading());
    try {
      const response = await productService.getAllProduct();
      setProducts(response);
      setCategories(getCategories(response));
      const firstCategory = getCategories(response)[0];
      setSelectedCategoryId(firstCategory?.id || null);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  const getCategories = (products) => {
    const categoryMap = new Map();

    products.forEach((item) => {
      if (!categoryMap.has(item.category_id)) {
        categoryMap.set(item.category_id, {
          id: item.category_id,
          name: item.category_name,
        });
      }
    });

    return Array.from(categoryMap.values());
  };

  const getFilteredProducts = () => {
    if (!selectedCategoryId) return products;
    return products.filter((p) => p.category_id === selectedCategoryId);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.appName}>Produk</Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF8C00" />
          <Text style={styles.loadingText}>Memuat produk...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <CategoryCarousel
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onCategoryPress={setSelectedCategoryId}
          />
          <ProductList products={getFilteredProducts()} />
        </ScrollView>
      )}
    </View>
  );
};

export default ProductScreen;
