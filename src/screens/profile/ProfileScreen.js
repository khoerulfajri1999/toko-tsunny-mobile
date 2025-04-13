import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SCREEN_PATH } from '../../navigation/PathNavigator';
import authService from '../../services/authService';
import { useAuth } from '../../context/authContext';
import ConfirmationModal from '../../shared/components/confirmation/ConfirmationModal';
import styles from './style/ProfileScreen.style';

const ProfileScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogout = async () => {
    setIsModalVisible(false);
    try {
      await logout();
    } catch (error) {
      Alert.alert('Logout Gagal', 'Terjadi kesalahan saat logout');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: 'https://imgs.search.brave.com/uLARhH16ug7xgUl3msl3yHs0DCWkofOAnLVeWQ-poy0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzI1Mi0y/NTI0Njk1X2R1bW15/LXByb2ZpbGUtaW1h/Z2UtanBnLWhkLXBu/Zy1kb3dubG9hZC5w/bmc',
          }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Fadli</Text>
          <Text style={styles.profileEmail}>+629878920901</Text>
          <Text style={styles.profileEmail}>fadlirahmanfauzan04@gmail.com</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate(SCREEN_PATH.CHANGE_PROFILE)}
        >
          <Ionicons name="person-outline" size={24} color="#FF8C00" />
          <Text style={styles.menuText}>Change Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate(SCREEN_PATH.CHANGE_PASSWORD)}
        >
          <Ionicons name="lock-closed-outline" size={24} color="#FF8C00" />
          <Text style={styles.menuText}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <ConfirmationModal
        visible={isModalVisible}
        title="Keluar"
        message="Apakah Anda yakin ingin keluar?"
        onConfirm={handleLogout}
        onCancel={() => setIsModalVisible(false)}
      />
    </View>
  );
};

export default ProfileScreen;
