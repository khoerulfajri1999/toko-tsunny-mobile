import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./BannerCTA.style";

const BannerCTA = () => {
  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.bannerTitle}>
        Jual dengan Jujur, Harga Bersahabat
      </Text>
      <Text style={styles.bannerSubtitle}>
        Melayani Sepenuh Hati InsyaAllah Berkah
      </Text>
      <TouchableOpacity style={styles.bannerButton}>
        <Text style={styles.bannerButtonText}>Hubungin Admin</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BannerCTA;
