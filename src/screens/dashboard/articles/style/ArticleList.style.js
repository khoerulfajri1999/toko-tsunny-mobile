import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    color: "#FF8C00",
    fontWeight: "bold",
  },
  articleListContainer: {
    paddingHorizontal: 15,
  },
  articleCard: {
    flexDirection: "row",
    backgroundColor: "#F8F8F7",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    marginHorizontal : 15
  },
  articleImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  articleContent: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  articleDescription: {
    fontSize: 12,
    color: "gray",
    marginBottom: 5,
  },
  articleDate: {
    fontSize: 13,
    color: "#FF8C00",
  },
});

export default styles;
