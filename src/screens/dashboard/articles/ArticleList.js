import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import styles from "./style/ArticleList.style";
import ArticleCard from "./ArticleCard";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_PATH } from "../../../navigation/PathNavigator";

const ArticleList = ({ articles }) => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Article</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList        
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        nestedScrollEnabled={true}
        scrollEnabled={false} 
        renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREEN_PATH.ARTICLE_DETAIL, { article: item })}
            >
              <ArticleCard article={item} />
            </TouchableOpacity>
          )}
        ListFooterComponent={() => <View style={{ height: 20 }} />}
      />
    </View>
  );
};

export default ArticleList;
