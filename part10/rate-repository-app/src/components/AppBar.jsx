import { useApolloClient, useQuery } from "@apollo/client/react";
import Constants from "expo-constants";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import theme from "../constants/theme";
import { GET_ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import AppBarTab from "./AppBarTab";

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const { data,  } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
  });

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab title="Repositories" route="/" />
        {data?.me ? (
          <AppBarTab title="Sign out" onPress={logout} />
        ) : (
          <AppBarTab title="Sign in" route="/signin" />
        )}

      </ScrollView>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.background.dark,
    flexDirection: "row",
    gap: 3,
    height: Platform.select({
      android: 100,
      web: 50,
    }),
    alignItems: "center",
  },
  tab: {
    color: "white",
    padding: 10,
  },
});
