import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './CategoryCarouse.style';

const CategoryCarousel = ({
  categories,
  onCategoryPress,
  selectedCategoryId,
  onRefresh,
}) => {
  const extendedCategories = [{ id: null, name: 'Lihat Semua' }, ...categories];

  return (
    <View>
      {/* Header Kategori */}
      <View style={styles.sectionHeaderWithButton}>
        <Text style={styles.sectionTitle}>Kategori Produk</Text>
      </View>

      {/* Daftar Kategori */}
      <FlatList
        data={extendedCategories}
        keyExtractor={(item) => (item.id !== null ? item.id.toString() : 'all')}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.eventListContainer}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedCategoryId;
          return (
            <TouchableOpacity
              style={[
                styles.categoryCard,
                { backgroundColor: isSelected ? '#FF8C00' : '#fff' },
              ]}
              onPress={() => onCategoryPress(item.id)}
            >
              <Text style={{ color: isSelected ? '#fff' : '#000' }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CategoryCarousel;
