import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#F8F8F8",
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    width: "100%",
    textAlign: "left",
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default styles;
