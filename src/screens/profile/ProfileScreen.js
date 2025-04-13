import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import Button from '../../shared/components/button/Button';
import ConfirmationModal from '../../shared/components/confirmation/ConfirmationModal';

const ProfileScreen = () => {
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowModal(false);
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCancelModal = () => setShowModal(false);

  return (
    <View>
      <Text>ProfileScreen</Text>

      <Button title="Keluar" onPress={handleOpenModal} />

      <ConfirmationModal
        visible={showModal}
        title="Konfirmasi Keluar"
        message="Apakah kamu yakin ingin keluar dari aplikasi?"
        onConfirm={handleLogout}
        onCancel={handleCancelModal}
      />
    </View>
  );
};

export default ProfileScreen;
