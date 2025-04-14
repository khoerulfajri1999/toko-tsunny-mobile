import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Pressable, TouchableHighlight } from "react-native";
import styles from "./style/ProductList.style";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_PATH } from "../../../navigation/PathNavigator";
import ProductCard from "./ProductCard";
import { Ionicons } from "@expo/vector-icons";

const ProductList = ({ products }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Produk</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={27} color="#FF8C00" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        nestedScrollEnabled={true}
        scrollEnabled={false}
        className="pt-1"
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate(SCREEN_PATH.PRODUCT_DETAIL, { product: item })
            }
          >
            <ProductCard product={item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Tidak ada produk pada kategori ini.
            </Text>
          </View>
        )}
        ListFooterComponent={() => <View style={{ height: 20 }} />}
      />
    </View>
  );
};

export default ProductList;
