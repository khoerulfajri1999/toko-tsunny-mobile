import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import styles from './CategoryCarouse.style';
import { Ionicons } from '@expo/vector-icons';
import categoryService from '../../../services/categoryService';

const CategoryCarousel = ({
  categories,
  onCategoryPress,
  selectedCategoryId,
  onRefresh,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState({
    name: '',
  });

  const extendedCategories = [{ id: null, name: 'Lihat Semua' }, ...categories];

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) {
      Alert.alert('Nama kategori tidak boleh kosong');
      return;
    }

    try {
      const newCategory = await categoryService.createCategory(categoryName);
      Alert.alert('Kategori berhasil ditambahkan');
      onCategoryPress(newCategory.id); // atau kamu bisa trigger useEffect di parent
      setModalVisible(false);
      setCategoryName('');
      onRefresh();
    } catch (error) {
      Alert.alert('Gagal menambahkan kategori');
    }
  };

  return (
    <View>
      {/* Header Kategori */}
      <View style={styles.sectionHeaderWithButton}>
        <Text style={styles.sectionTitle}>Kategori Produk</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={27} color="#FF8C00" />
        </TouchableOpacity>
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

      {/* Modal Tambah Kategori */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Tambah Kategori</Text>
            <TextInput
              placeholder="Nama Kategori"
              style={styles.input}
              value={categoryName}
              onChangeText={setCategoryName}
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleCreateCategory}
              >
                <Text style={styles.buttonText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CategoryCarousel;
