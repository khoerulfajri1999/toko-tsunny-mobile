import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import styles from './style/TransactionForm.style';
import InputField from '../../shared/components/input/InputField';
import Button from '../../shared/components/button/Button';
import productService from '../../services/productService';
import transactionService from '../../services/transactionService';
import { SCREEN_PATH } from '../../navigation/PathNavigator';

const TransactionFormScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    transactionAt: new Date(),
    income: '',
    expense: '',
  });

  const [details, setDetails] = useState([{ product_id: '', quantity: '' }]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const getAllProducts = async () => {
    try {
      const response = await productService.getAllProduct();
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const isEveryDetailFilled = details.every(
      (d) => d.product_id && d.quantity && !isNaN(d.quantity)
    );

    const total = calculateGrandTotal();
    const incomeValid = parseInt(formData.income) === total;

    if (!isEveryDetailFilled) {
      setValidationMessage('Semua produk dan jumlah harus diisi.');
      setIsFormValid(false);
    } else if (!incomeValid) {
      setValidationMessage('Pendapatan harus sama dengan total keseluruhan.');
      setIsFormValid(false);
    } else {
      setValidationMessage('');
      setIsFormValid(true);
    }
  }, [formData, details]);

  const formatIndonesianDate = (date) => {
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const handleRemoveDetail = (index) => {
    const newDetails = [...details];
    newDetails.splice(index, 1);
    setDetails(newDetails);
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...details];
    newDetails[index][field] = value;
    setDetails(newDetails);
  };

  const handleAddDetail = () => {
    setDetails([...details, { product_id: '', quantity: '' }]);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        transaction_at: formData.transactionAt.toISOString().split('T')[0],
        income: parseInt(formData.income),
        expense: parseInt(formData.expense),
        details: details.map((d) => ({
          product_id: parseInt(d.product_id),
          quantity: parseInt(d.quantity),
        })),
      };

      const response = await transactionService.createTransaction(payload);
      Alert.alert('Sukses', 'Transaksi berhasil dibuat', [
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate(SCREEN_PATH.TRANSACTION_SUMMARY, {
              id: response.id,
            }),
        },
      ]);

      // Reset form ke nilai awal
      setFormData({
        transactionAt: new Date(),
        income: '',
        expense: '',
      });
      setDetails([{ product_id: '', quantity: '' }]);
      setValidationMessage('');
      setIsFormValid(false);

      // Opsional: jika kamu masih ingin kembali ke halaman sebelumnya
      // navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Gagal', 'Terjadi kesalahan saat menyimpan transaksi');
    } finally {
      setLoading(false);
    }
  };


  const calculateSubtotal = (productId, quantity) => {
    const product = (products || []).find((p) => p.id === parseInt(productId));
    if (!product || isNaN(quantity)) return 0;
    return product.price * quantity;
  };

  const calculateGrandTotal = () => {
    return details.reduce((sum, item) => {
      const subtotal = calculateSubtotal(item.product_id, item.quantity || 0);
      return sum + subtotal;
    }, 0);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1 }}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Transaksi</Text>
      </View>

      <View style={{ padding: 20 }}>
        <Text style={styles.label}>Pendapatan</Text>
        <InputField
          label="Income"
          placeholder="Masukkan Pendapatan Harian"
          keyboardType="numeric"
          value={formData.income}
          onChangeText={(text) => setFormData({ ...formData, income: text })}
        />

        <Text style={styles.label}>Pengeluaran</Text>
        <InputField
          label="Expense"
          placeholder="Masukkan Pengeluaran Harian"
          keyboardType="numeric"
          value={formData.expense}
          onChangeText={(text) => setFormData({ ...formData, expense: text })}
        />

        <Text style={styles.label}>Pilih Tanggal Transaksi</Text>
        <Button
          title={formatIndonesianDate(formData.transactionAt)}
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={formData.transactionAt}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setFormData({ ...formData, transactionAt: date });
            }}
          />
        )}

        <Text style={styles.label}>Detail Produk</Text>
        {details.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            {/* Dropdown */}
            <View
              style={{
                flex: 2,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 10,
                height: 50,
                justifyContent: 'center',
                backgroundColor: '#F8F8F8',
              }}
            >
              <Picker
                selectedValue={item.product_id}
                onValueChange={(value) =>
                  handleDetailChange(index, 'product_id', value)
                }
                style={{ height: 60, width: '100%' }}
              >
                <Picker.Item label="Pilih Produk" value="" />
                {(products || []).map((product) => (
                  <Picker.Item
                    key={product.id}
                    label={
                      product.stock === 0
                        ? `${product.name} - Stok Habis`
                        : `${product.name} (Rp ${product.price.toLocaleString(
                            'id-ID'
                          )})`
                    }
                    value={product.id}
                    enabled={product.stock > 0}
                  />
                ))}
              </Picker>
            </View>

            {/* Spacer */}
            <View style={{ width: 10 }} />

            {/* Quantity Input */}
            <View
              style={{
                flex: 1,
                height: 50,
                justifyContent: 'center',
                marginTop: 10,
              }}
            >
              <InputField
                placeholder="Total"
                keyboardType="numeric"
                value={item.quantity.toString()}
                onChangeText={(text) =>
                  handleDetailChange(index, 'quantity', text)
                }
              />
            </View>

            {/* Hapus Button */}
            {details.length > 1 && (
              <TouchableOpacity
                onPress={() => handleRemoveDetail(index)}
                style={{ marginLeft: 10, marginTop: 10 }}
              >
                <Ionicons name="remove-circle-outline" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity
          onPress={handleAddDetail}
          style={{
            alignSelf: 'flex-start',
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons name="add-circle-outline" size={20} color="blue" />
          <Text style={{ color: 'blue', fontWeight: 'bold', marginLeft: 5 }}>
            Tambah Produk
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            Total Keseluruhan: Rp{' '}
            {calculateGrandTotal().toLocaleString('id-ID')}
          </Text>
        </View>
        {validationMessage ? (
          <View style={{ marginBottom: 10 }}>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>
              ⚠️ {validationMessage}
            </Text>
          </View>
        ) : null}

        <Button
          title="Simpan Transaksi"
          onPress={handleSubmit}
          loading={loading}
          disabled={!isFormValid}
        />
      </View>
    </ScrollView>
  );
};

export default TransactionFormScreen;