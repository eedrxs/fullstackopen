import { useApolloClient } from "@apollo/client/react";
import useAuthStorage from "../hooks/useAuthStorage";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useFormik } from "formik";
import Text from "./Text";
import * as yup from "yup";
import theme from "../constants/theme";

const SignUp = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [signUp, signUpResult] = useSignUp();
  const [signIn, signInResult] = useSignIn();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;

      try {
        await signUp({ username, password });
        const { data } = await signIn({ username, password });
        const accessToken = data.authenticate.accessToken;
        await authStorage.setAccessToken(accessToken);
        apolloClient.resetStore();
      } catch (e) {
        Alert.alert(e.message);
      }
    },
  });

  const usernameError = formik.touched.username && formik.errors.username;
  const passwordError = formik.touched.password && formik.errors.password;
  const passwordConfirmationError =
    formik.touched.passwordConfirmation && formik.errors.passwordConfirmation;

  const loading = signInResult.loading || signUpResult.loading;

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        autoCapitalize="none"
        style={[styles.input, usernameError && { borderColor: "#d73a4a" }]}
      />
      {usernameError && (
        <Text style={{ color: "#d73a4a" }}>{usernameError}</Text>
      )}

      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        autoCapitalize="none"
        style={[styles.input, passwordError && { borderColor: "#d73a4a" }]}
        secureTextEntry
      />
      {passwordError && (
        <Text style={{ color: "#d73a4a" }}>{passwordError}</Text>
      )}

      <TextInput
        placeholder="Password confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
        autoCapitalize="none"
        style={[
          styles.input,
          passwordConfirmationError && { borderColor: "#d73a4a" },
        ]}
        secureTextEntry
      />
      {passwordConfirmationError && (
        <Text style={{ color: "#d73a4a" }}>{passwordConfirmationError}</Text>
      )}

      <Pressable onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={styles.submitBtn}>
          {loading ? "Signing up..." : "Sign up"}
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;

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
  username: yup.string().required("Username is required").min(5).max(30),
  password: yup.string().required("Password is required").min(5).max(50),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
