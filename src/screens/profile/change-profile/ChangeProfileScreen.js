import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ChangeProfileForm from "./ChangeProfileForm";
import styles from "./style/ChangeProfileScreen.style";
import { useSelector } from "react-redux";


const ChangeProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);

  const handleSave = (updatedData) => {
    console.log("Profile Updated:", updatedData);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Change Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Picture */}
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: "https://via.placeholder.com/100" }} 
            style={styles.profileImage} 
          />
          <TouchableOpacity style={styles.cameraIcon}>
            <Ionicons name="camera" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Change Profile Form */}
        <ChangeProfileForm initialData={user} onSave={handleSave} />
      </ScrollView>
    </View>
  );
};

export default ChangeProfileScreen;
