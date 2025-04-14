import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import styles from "./EventCarouse.style";
import { SCREEN_PATH } from "../../../navigation/PathNavigator";
import { useNavigation } from "@react-navigation/native";

const EventCarousel = ({events}) => {
    const navigation = useNavigation()
  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Special in LaundryCare</Text>
      </View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.eventListContainer}
        renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.eventCard} 
              onPress={() => navigation.navigate(SCREEN_PATH.EVENT_DETAIL, { event: item })}
            >
              <Image source={{ uri: item.image }} style={styles.eventImage} />
            </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default EventCarousel;
