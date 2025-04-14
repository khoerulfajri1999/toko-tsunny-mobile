import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style/ProductCard.style';

const ProductCard = ({ product }) => {
  const optimizedImageUrl = `${product.image_url}?tr=w-300,h-300,q-80`;
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: optimizedImageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.description}>
          {product.description.substring(0, 80)}...
        </Text>
        <Text style={styles.date}>Stok : {product.stock}</Text>
        <Text style={styles.description}>Harga : {product.price}</Text>
        <Text style={styles.description}>Terjual : {product.units_sold}</Text>
      </View>
    </View>
  );
};

export default ProductCard;
