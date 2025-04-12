import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import styles from "./LoadingStyle";

export default function Loading() {
  const isLoading = useSelector((state) => state.app.isLoading);
  if (!isLoading) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={"#ff4800"} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}
