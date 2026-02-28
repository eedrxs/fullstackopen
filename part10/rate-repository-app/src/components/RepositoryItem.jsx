import { Image, Linking, Pressable, StyleSheet, View } from "react-native";
import theme from "../constants/theme";
import Text from "./Text";
import { useParams } from "react-router-native";

const RepositoryItem = ({ repo }) => {
  const { id } = useParams();
  const isRepoPage = !!id;

  return (
    <View
      testID="repositoryItem"
      style={[styles.container, isRepoPage && { marginBottom: 10 }]}
    >
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Image source={{ uri: repo.ownerAvatarUrl }} style={styles.photo} />

        <View style={{ gap: 5, flex: 1 }}>
          <Text fontWeight="bold">{repo.fullName}</Text>
          <Text>{repo.description}</Text>
          <Text style={styles.language}>{repo.language}</Text>
        </View>
      </View>

      {/* stats */}
      <View style={styles.stats}>
        <Stat title="Stars" value={repo.stargazersCount} />
        <Stat title="Forks" value={repo.forksCount} />
        <Stat title="Reviews" value={repo.reviewCount} />
        <Stat title="Rating" value={repo.ratingAverage} />
      </View>

      {isRepoPage && (
        <Pressable
          onPress={() => Linking.openURL(repo.url)}
          style={styles.openBtn}
        >
          <Text style={styles.openBtnText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    gap: 20,
  },
  photo: {
    width: 45,
    aspectRatio: 1,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    color: "white",
    padding: 4,
    alignSelf: "flex-start",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stat: {
    gap: 5,
    alignItems: "center",
  },
  openBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    color: "white",
    padding: 4,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  openBtnText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: 800,
  },
});

const Stat = ({ title, value }) => {
  return (
    <View style={styles.stat}>
      <Text testID={title} fontWeight="bold" fontSize="subheading">
        {formatCount(value)}
      </Text>
      <Text fontSize="subheading">{title}</Text>
    </View>
  );
};

export function formatCount(count) {
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return count.toString();
}
