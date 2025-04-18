import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style/ProductList.style';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_PATH } from '../../../navigation/PathNavigator';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  const navigation = useNavigation();
const sortedProducts = [...(products || [])].sort((a, b) => b.id - a.id);


  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Produk</Text>
      </View>

      {sortedProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Tidak ada produk pada kategori ini.
          </Text>
        </View>
      ) : (
        <View style={styles.gridContainer}>
          {sortedProducts.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate(SCREEN_PATH.PRODUCT_DETAIL, {
                  product: item,
                })
              }
              style={styles.cardWrapper}
            >
              <ProductCard product={item} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default ProductList;
