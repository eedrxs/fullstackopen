import { Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const AppBarTab = ({ title, route, onPress }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.tab}>
        <Text fontWeight="bold" style={styles.text}>
          {title}
        </Text>
      </Pressable>
    );
  }

  if (route) {
    return (
      <Link to={route} style={styles.tab}>
        <Text fontWeight="bold" style={styles.text}>
          {title}
        </Text>
      </Link>
    );
  }

  return null;
};

export default AppBarTab;

const styles = StyleSheet.create({
  tab: {
    color: "white",
    padding: 10,
  },
  text: {
    color: "white",
  },
});
