import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventListContainer: {
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  eventCard: {
    width: width * 0.85,
    height: 150,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
  },
  eventImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default styles;
