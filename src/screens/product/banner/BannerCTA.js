import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./BannerCTA.style";

const BannerCTA = () => {
  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.bannerTitle}>Bebaskan Diri Dari Urusan Laundry</Text>
      <Text style={styles.bannerSubtitle}>Gunakan LaundryCare untuk kemudahan mencuci pakaian</Text>
      <TouchableOpacity style={styles.bannerButton}>
        <Text style={styles.bannerButtonText}>Pesan Sekarang</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BannerCTA;
