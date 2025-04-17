import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF8C00',
    height: height * 0.07,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  articleImage: {
    width: width,
    height: height * 0.35,
    resizeMode: 'cover',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: -20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  date: {
    fontSize: 14,
    color: '#FF8C00',
    marginLeft: 5,
  },
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'justify',
    lineHeight: 24,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
    marginBottom: 12,
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  metaText: {
    fontSize: 14,
    color: '#555',
  },

  infoBox: {
    marginTop: 16,
  },

  infoText: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight:'bold',
    color: '#FF8C00',
  },
  infoTextPrice: {
    fontSize: 16,
    marginBottom: 4,
    color: '#FF8C00',
    fontWeight:'bold'
  },
  editBottomButton: {
    flexDirection: 'row',
    backgroundColor: '#FF8C00',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    alignSelf: 'center',
  },
  editBottomText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default styles;
