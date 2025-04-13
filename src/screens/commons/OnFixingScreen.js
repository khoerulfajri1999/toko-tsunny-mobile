import React from "react";
import { View, StyleSheet } from "react-native";
import OnFixing from "../../shared/components/on-fixing/OnFixing";
import BackButton from "../../shared/components/back-button/BackButton";

const OnFixingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>      
      <BackButton navigation={navigation} title="Feature Unavailable" />
      <OnFixing/>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
})

export default OnFixingScreen;
