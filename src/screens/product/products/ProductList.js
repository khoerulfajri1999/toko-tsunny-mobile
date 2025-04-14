import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Pressable, TouchableHighlight } from "react-native";
import styles from "./style/ProductList.style";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_PATH } from "../../../navigation/PathNavigator";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Produk</Text>
        {/* <TouchableOpacity>
          <Text style={styles.seeAll}>Lihat Semua</Text>
        </TouchableOpacity> */}
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
        ListFooterComponent={() => <View style={{ height: 20 }} />}
      />
    </View>
  );
};

export default ProductList;
