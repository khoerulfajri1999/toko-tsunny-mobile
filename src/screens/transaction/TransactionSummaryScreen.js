import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './style/TransactionForm.style';
import transactionService from '../../services/transactionService';
import productService from '../../services/productService';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../../store/slice/appSlice';
import { Ionicons } from '@expo/vector-icons';

const TransactionSummaryScreen = ({navigation}) => {
  const route = useRoute();
  const { id } = route.params;

  const dispatch = useDispatch();
  const [transaction, setTransaction] = useState(null);
  const [productsMap, setProductsMap] = useState({});
  const loading = useSelector((state) => state.app.loading);

  useEffect(() => {
    const fetchTransaction = async () => {
      dispatch(startLoading());
      try {
        const [transactionData, allProducts] = await Promise.all([
          transactionService.getTransactionById(id),
          productService.getAllProduct(),
        ]);

        const productMap = {};
        allProducts.forEach((product) => {
          productMap[product.id] = product;
        });

        setProductsMap(productMap);
        setTransaction(transactionData);
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Gagal memuat detail transaksi');
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchTransaction();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Transaksi tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Rangkuman Transaksi</Text>
      </View>
      <View style={{ padding: 20 }}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: 'monospace',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            TOKO TSANNY
          </Text>
          <Text style={{ fontFamily: 'monospace', fontSize: 12 }}>
            {formatDate(transaction.transaction_at)}
          </Text>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            paddingVertical: 10,
          }}
        >
          {transaction.details.map((item, index) => {
            const product = productsMap[item.product_id] || {};
            const productName = product.name || 'Produk';
            const price = product.price || 0;
            const subtotal = item.sub_total || 0;

            return (
              <Text
                key={index}
                style={{
                  fontFamily: 'monospace',
                  fontSize: 14,
                  marginBottom: 4,
                }}
              >
                {item.quantity} x {productName.padEnd(15)}{' '}
                {subtotal.toLocaleString('id-ID').padStart(8)}
              </Text>
            );
          })}
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={{ fontFamily: 'monospace', fontSize: 14 }}>
            ----------------------------
          </Text>
          <Text
            style={{ fontFamily: 'monospace', fontSize: 16, marginBottom: 10 }}
          >
            Total{' '.repeat(18)}: Rp{' '}
            {transaction.total_amount.toLocaleString('id-ID')}
          </Text>
          <Text style={{ fontFamily: 'monospace', fontSize: 14 }}>
            Pendapatan Hari Ini{' '.repeat(5)}: Rp{' '}
            {transaction.income.toLocaleString('id-ID')}
          </Text>
          <Text style={{ fontFamily: 'monospace', fontSize: 14 }}>
            Pengeluaran Hari Ini{' '.repeat(5)}: Rp{' '}
            {transaction.expense.toLocaleString('id-ID')}
          </Text>
          <Text
            style={{
              fontFamily: 'monospace',
              fontSize: 14,
              marginTop: 20,
              textAlign: 'center',
            }}
          >
            Terima Kasih Rekapan Hari Ini Telah Tersimpan
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TransactionSummaryScreen;
