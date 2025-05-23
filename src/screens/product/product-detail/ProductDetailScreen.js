import React, { useCallback, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ProductDetailScreen.style';
import { SCREEN_PATH } from '../../../navigation/PathNavigator';
import { useFocusEffect } from '@react-navigation/native';
import productService from '../../../services/productService';

const ProductDetailScreen = ({ route, navigation }) => {
    const { product: initialProduct } = route.params;
    const [product, setProduct] = useState(initialProduct);

    useFocusEffect(
      useCallback(() => {
        const fetchProduct = async () => {
          try {
            const updated = await productService.getProductById(
              initialProduct.id
            );
            setProduct(updated);
          } catch (error) {
            console.error('Failed to fetch product:', error);
          }
        };

        fetchProduct();
      }, [initialProduct.id])
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detail Produk</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: product.image_url }}
          style={styles.articleImage}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{product.name}</Text>
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="pricetag-outline" size={18} color="#FF8C00" />
              <Text style={styles.metaText}>{product.category_name}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={18} color="#FF8C00" />
              <Text style={styles.metaText}>
                {new Date(product.created_at).toLocaleDateString()}
              </Text>
            </View>
          </View>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Harga :{' '}
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(product.price)}
            </Text>
            <Text style={styles.infoText}>Stok: {product.stock}</Text>
            <Text style={styles.infoText}>Terjual: {product.units_sold}</Text>
          </View>

          <TouchableOpacity
            style={styles.editBottomButton}
            onPress={() =>
              navigation.navigate(SCREEN_PATH.EDIT_PRODUCT, { product })
            }
          >
            <Ionicons name="create-outline" size={20} color="#fff" />
            <Text style={styles.editBottomText}>Edit Produk</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;
