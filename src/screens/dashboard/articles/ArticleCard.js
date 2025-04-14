import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./style/ArticleCard.style";

const ArticleCard = ({ article }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: article.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.description}>
          {article.description.substring(0, 80)}...
        </Text>
        <Text style={styles.date}>{article.date}</Text>
      </View>
    </View>
  );
};

export default ArticleCard;
