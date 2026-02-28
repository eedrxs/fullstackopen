import { useApolloClient, useQuery } from "@apollo/client/react";
import Constants from "expo-constants";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import theme from "../constants/theme";
import useAuthStorage from "../hooks/useAuthStorage";
import AppBarTab from "./AppBarTab";
import useGetMe from "../hooks/useGetMe";
import { useNavigate } from "react-router-native";

const AppBar = () => {
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const { data } = useGetMe();

  const logout = async () => {
    navigate("/");
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab title="Repositories" route="/" />
        {data?.me && <AppBarTab title="Create review" route="/create-review" />}
        {data?.me && <AppBarTab title="My reviews" route="/my-reviews" />}

        {data?.me ? (
          <AppBarTab title="Sign out" onPress={logout} />
        ) : (
          <>
            <AppBarTab title="Sign in" route="/signin" />
            <AppBarTab title="Sign up" route="/signup" />
          </>
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
