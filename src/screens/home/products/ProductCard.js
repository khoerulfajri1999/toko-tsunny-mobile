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
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {product.name}
      </Text>
      <Text style={styles.price}>
        {new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(product.price)}
      </Text>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        Stok : {product.stock}
      </Text>
    </View>
  );
};

export default ProductCard;
