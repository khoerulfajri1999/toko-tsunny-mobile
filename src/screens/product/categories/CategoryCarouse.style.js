import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventListContainer: {
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  categoryCard: {
    marginTop: 10,
    height: 40,
    marginHorizontal: 8,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3, 
    paddingVertical: 5,
    paddingHorizontal: 26,
  },

  eventImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default styles;
