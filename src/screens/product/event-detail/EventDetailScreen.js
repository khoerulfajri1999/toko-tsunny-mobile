import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./EventDetailScreen.style";

const EventDetailScreen = ({ route, navigation }) => {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Event Detail</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Event Image */}
        <Image source={{ uri: event.image }} style={styles.eventImage} />

        {/* Event Title */}
        <Text style={styles.eventTitle}>{event.title}</Text>

        {/* Event Description */}
        <Text style={styles.eventDescription}>{event.description}</Text>

        {/* Event Footer */}
        <View style={styles.footer}>
          <Ionicons name="calendar-outline" size={20} color="#FF8C00" />
          <Text style={styles.eventDate}>Event Date: {event.date || "TBA"}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetailScreen;
