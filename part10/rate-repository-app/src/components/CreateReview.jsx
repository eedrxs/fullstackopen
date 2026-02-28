import { useFormik } from "formik";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./Text";
import * as yup from "yup";
import theme from "../constants/theme";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview, result] = useCreateReview();

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      rating: "",
      review: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, name, rating, review } = values;

      try {
        const { data } = await createReview({
          rating: Number(rating),
          repositoryName: name,
          text: review,
          ownerName: username,
        });

        const repositoryId = data.createReview.repositoryId;
        navigate(`/repo/${repositoryId}`);
      } catch (e) {
        Alert.alert(e.message);
      }
    },
  });

  const usernameError = formik.touched.username && formik.errors.username;
  const nameError = formik.touched.name && formik.errors.name;
  const ratingError = formik.touched.rating && formik.errors.rating;
  const reviewError = formik.touched.review && formik.errors.review;

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Repository owner name"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        style={[styles.input, usernameError && { borderColor: "#d73a4a" }]}
      />
      {usernameError && (
        <Text style={{ color: "#d73a4a" }}>{usernameError}</Text>
      )}

      <TextInput
        placeholder="Repository name"
        value={formik.values.name}
        onChangeText={formik.handleChange("name")}
        style={[styles.input, nameError && { borderColor: "#d73a4a" }]}
      />
      {nameError && <Text style={{ color: "#d73a4a" }}>{nameError}</Text>}

      <TextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        keyboardType="number-pad"
        style={[styles.input, ratingError && { borderColor: "#d73a4a" }]}
      />
      {ratingError && <Text style={{ color: "#d73a4a" }}>{ratingError}</Text>}

      <TextInput
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange("review")}
        style={[styles.input, reviewError && { borderColor: "#d73a4a" }]}
        multiline
        numberOfLines={5}
      />
      {reviewError && <Text style={{ color: "#d73a4a" }}>{reviewError}</Text>}

      <Pressable onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={styles.submitBtn}>
          {result?.loading ? "Creating a review..." : "Create a review"}
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 15,
  },
  input: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    color: theme.colors.textSecondary,
    padding: 15,
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    textAlign: "center",
    alignContent: "center",
    padding: 12,
    borderRadius: 3,
    color: "white",
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  name: yup.string().required("Name is required"),
  rating: yup.number().min(0).max(100).required(),
  review: yup.string().optional(),
});
