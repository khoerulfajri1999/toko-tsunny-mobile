import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ProductDetailScreen.style';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

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
            <Text style={styles.infoText}>Harga: Rp {product.price}</Text>
            <Text style={styles.infoText}>Stok: {product.stock}</Text>
            <Text style={styles.infoText}>Terjual: {product.units_sold}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;
