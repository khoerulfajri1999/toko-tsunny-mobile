// import React from "react";
// import { View, ScrollView, Text } from "react-native";
// import styles from "./HomeScreen.style";
// import { Ionicons } from "@expo/vector-icons";
// import BannerCTA from "./banner/BannerCTA";
// import EventCarousel from "./events/EventCarousel";
// import ArticleList from "./articles/ArticleList";
// import { events } from "../../utils/dummies/events";
// import { articles } from "../../utils/dummies/articles";

// const HomeScreen = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.topBar}>
//         <Text style={styles.appName}>Toko Tsunny</Text>
//       </View>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <BannerCTA />
//         <EventCarousel events={events} />
//         <ArticleList articles={articles} />
//       </ScrollView>
//     </View>
//   );
// };

// export default HomeScreen; 

import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import styles from './HomeScreen.style';
import { useDispatch, useSelector } from 'react-redux';
import productService from '../../services/productService';
import CategoryCarousel from './categories/CategoryCarousel';
import ProductList from './products/ProductList';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import categoryService from '../../services/categoryService';
import { startLoading, stopLoading } from '../../store/slice/appSlice';
import BannerCTA from './banner/BannerCTA';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const isLoading = useSelector((state) => state.app.loading);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const fetchProducts = useCallback(async () => {
    dispatch(startLoading());
    try {
      const [productResponse, categoryResponse] = await Promise.all([
        productService.getAllProduct(),
        categoryService.getAllCategories(),
      ]);
      setProducts(productResponse);
      setCategories(categoryResponse);

      if (selectedCategoryId === null && categoryResponse.length > 0) {
        setSelectedCategoryId(categoryResponse[0].id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  }, [dispatch, selectedCategoryId]);

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
          <BannerCTA />
          <CategoryCarousel
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onCategoryPress={setSelectedCategoryId}
            onRefresh={fetchProducts}
          />
          <ProductList products={getFilteredProducts()} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
