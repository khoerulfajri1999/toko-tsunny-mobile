import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: "#fff",
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: "contain",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#FF8C00",
      marginTop: 15,
    },
    description: {
      fontSize: 14,
      color: "#666",
      textAlign: "center",
      marginTop: 10,
    },
  });

  export default styles