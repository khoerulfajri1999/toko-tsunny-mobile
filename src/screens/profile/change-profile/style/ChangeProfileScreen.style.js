import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    backgroundColor: "#FF8C00",
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 15,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default styles;
