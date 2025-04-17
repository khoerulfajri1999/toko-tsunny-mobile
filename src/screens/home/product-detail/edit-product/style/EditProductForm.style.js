import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  productImageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: width * 0.26,
    backgroundColor: '#FF8C00',
    padding: 5,
    borderRadius: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
  },
});

export default styles;
