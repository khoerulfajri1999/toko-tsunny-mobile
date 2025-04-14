import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#F8F8F7",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    marginHorizontal: 15,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: "#FF8C00",
    fontWeight: "bold",
  },
});

export default styles;
