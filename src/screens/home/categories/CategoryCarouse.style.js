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
  sectionHeaderWithButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },

  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  cancelButton: {
    marginRight: 10,
  },

  saveButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
