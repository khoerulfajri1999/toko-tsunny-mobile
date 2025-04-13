import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./OnFixing.style"

const OnFixing = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require("../../assets/on-fixing.png")} 
        style={styles.image} 
      />
      <Text style={styles.title}>Feature Under Maintenance</Text>
      <Text style={styles.description}>
        We are currently working on improving this feature. Please check back later!
      </Text>
    </View>
  );
};

export default OnFixing;
