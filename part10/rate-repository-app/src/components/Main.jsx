import { StyleSheet, View } from "react-native";
import { Navigate, Route, Routes } from "react-router-native";
import theme from "../constants/theme";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SingleRepository from "./SingleRepository";
import CreateReview from "./CreateReview";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/repo/:id" element={<SingleRepository />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
