import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ArticleDetailScreen.style";


const ArticleDetailScreen = ({ route, navigation }) => {
  const { article } = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Article Detail</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: article.image }} style={styles.articleImage} />
        <View style={styles.content}>
          <Text style={styles.title}>{article.title}</Text>
          
          {/* Date with Icon */}
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={18} color="#FF8C00" />
            <Text style={styles.date}>{article.date}</Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>{article.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ArticleDetailScreen;
