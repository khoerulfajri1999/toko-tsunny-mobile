import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 5,
    elevation: 2,
    width: 100, 
    height: 180,
  },
  image: {
    width: 90,
    height: 90,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
    textAlign: 'center',
    width: '100%', 
  },
  price: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ff6600',
    marginTop: 2,
  },
});


export default styles;
