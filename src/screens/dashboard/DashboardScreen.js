import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';
import transactionService from '../../services/transactionService';
import styles from './style/DashboardScreen.Style';
import productService from '../../services/productService';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];

  useEffect(() => {
    fetchTransactions();
    fetchAllProducts();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await transactionService.getAllTransaction();
      setTransactions(response);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data transaksi');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await productService.getAllProduct();
      const warnings = response.filter((product) => product.stock <= 5);
      setLowStockProducts(warnings);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotal = (type) => {
    return filterTransactions().reduce((sum, trx) => {
      const value = type === 'income' ? trx.income : trx.expense;
      return sum + (typeof value === 'number' ? value : 0);
    }, 0);
  };

  const filterTransactions = () => {
    return transactions.filter((trx) => {
      const date = new Date(trx.transaction_at);
      return (
        date.getFullYear() === selectedYear &&
        date.getMonth() + 1 === selectedMonth
      );
    });
  };

  const generateDailyData = (type) => {
    const daily = Array(31).fill(0);
    filterTransactions().forEach((trx) => {
      const day = new Date(trx.transaction_at).getDate() - 1;
      const value = type === 'income' ? trx.income : trx.expense;
      daily[day] += typeof value === 'number' ? value : 0;
    });
    return daily;
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerTop}>
        <Text style={styles.headerText}>Halaman Utama</Text>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={styles.header}>Grafik Transaksi</Text>

        <View style={styles.filterContainer}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedMonth}
              style={styles.picker}
              mode="dropdown"
              onValueChange={(value) => setSelectedMonth(value)}
            >
              {months.map((month, index) => (
                <Picker.Item key={index} label={month} value={index + 1} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedYear}
              style={styles.picker}
              mode="dropdown"
              onValueChange={(value) => setSelectedYear(value)}
            >
              {years.map((year, index) => (
                <Picker.Item key={index} label={year.toString()} value={year} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartLabel}>Pendapatan</Text>
          <Text className="text-center">
            ( Total :
            <Text className="text-orange-400">
              {' '}
              Rp {calculateTotal('income').toLocaleString('id-ID')}{' '}
            </Text>{' '}
            )
          </Text>
          <LineChart
            data={{
              labels: Array.from({ length: 31 }, (_, i) =>
                (i + 1) % 5 === 0 ? (i + 1).toString() : ''
              ),
              datasets: [{ data: generateDailyData('income'), strokeWidth: 2 }],
            }}
            width={screenWidth - 40}
            height={220}
            fromZero
            withVerticalLabels={true}
            withHorizontalLabels
            withInnerLines={true}
            withVerticalLines={false}
            withOuterLines={true}
            withDots={false}
            formatYLabel={(yValue) => {
              const num = parseFloat(yValue);
              if (num >= 1000000) return (num / 1000000).toFixed(0) + 'jt';
              if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
              return num.toString();
            }}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '3',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            style={styles.chart}
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartLabel}>Pengeluaran</Text>
          <Text className="text-center">
            ( Total :
            <Text className="text-orange-400">
              {' '}
              Rp {calculateTotal('expense').toLocaleString('id-ID')}{' '}
            </Text>{' '}
            )
          </Text>
          <LineChart
            data={{
              labels: Array.from({ length: 31 }, (_, i) =>
                (i + 1) % 5 === 0 ? (i + 1).toString() : ''
              ),
              datasets: [
                { data: generateDailyData('expense'), strokeWidth: 2 },
              ],
            }}
            width={screenWidth - 40}
            height={220}
            fromZero
            withVerticalLabels={true}
            withHorizontalLabels
            withInnerLines={true}
            withVerticalLines={false}
            withOuterLines={true}
            withDots={false}
            formatYLabel={(yValue) => {
              const num = parseFloat(yValue);
              if (num >= 1000000) return (num / 1000000).toFixed(0) + 'jt';
              if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
              return num.toString();
            }}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '3',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            style={styles.chart}
          />
        </View>
        {lowStockProducts.length > 0 && (
          <View style={styles.warningContainer}>
            <Text style={styles.header}>⚠️ Peringatan Stok Rendah</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCellHeader}>Nama Produk</Text>
              <Text style={styles.tableCellHeader}>Stok</Text>
            </View>
            {lowStockProducts.map((product) => (
              <View key={product.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{product.name}</Text>
                <Text
                  style={[
                    styles.tableCell,
                    { color: product.stock === 0 ? 'red' : 'orange' },
                  ]}
                >
                  {
                    product.stock === 0 ? '0 ( Habis )' : product.stock
                  }
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
