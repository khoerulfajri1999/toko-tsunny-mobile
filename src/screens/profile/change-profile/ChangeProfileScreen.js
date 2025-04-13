import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ChangeProfileForm from "./ChangeProfileForm";
import styles from "./style/ChangeProfileScreen.style";


const ChangeProfileScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    phoneNumber: "081234567890",
    email: "johndoe@example.com",
    address: "Jl. Mawar No. 123, Jakarta",
  });

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
        <ChangeProfileForm initialData={profileData} onSave={handleSave} />
      </ScrollView>
    </View>
  );
};

export default ChangeProfileScreen;
