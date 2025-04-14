import React from "react";
import { View, ScrollView, Text } from "react-native";
import styles from "./DashboardScreen.style";
import { Ionicons } from "@expo/vector-icons";
import BannerCTA from "./banner/BannerCTA";
import EventCarousel from "./events/EventCarousel";
import ArticleList from "./articles/ArticleList";
import { events } from "../../utils/dummies/events";
import { articles } from "../../utils/dummies/articles";

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.appName}>LaundryCare</Text>
        <View style={styles.iconContainer}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner CTA */}
        <BannerCTA />

        {/* Event Carousel */}
        <EventCarousel events={events} />

        {/* Article List */}
        <ArticleList articles={articles}/>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;
