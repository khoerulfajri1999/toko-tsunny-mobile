import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import styles from './BannerCTA.style';

const BannerCTA = () => {
  const handleChat = () => {
    const phoneNumber = '62882003152514'; // Ganti dengan nomor WA admin
    const message = 'Halo Admin, saya ingin bertanya.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url).catch((err) =>
      console.error('Gagal membuka WhatsApp:', err)
    );
  };

  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.bannerTitle}>
        Jual dengan Jujur, Harga Bersahabat
      </Text>
      <Text style={styles.bannerSubtitle}>
        Melayani Sepenuh Hati InsyaAllah Berkah
      </Text>
      <TouchableOpacity style={styles.bannerButton} onPress={handleChat}>
        <Text style={styles.bannerButtonText}>Hubungi Admin</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BannerCTA;
