import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#FF8C00",
    height: height * 0.07,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,    
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  eventImage: {
    width: width * 0.9,
    height: height * 0.3,
    borderRadius: 15,
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 16,
    color: "#555",
    textAlign: "justify",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  eventDate: {
    fontSize: 14,
    color: "#FF8C00",
    marginLeft: 5,
  },
});

export default styles;
