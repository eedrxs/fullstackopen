import { useApolloClient } from "@apollo/client/react";
import { useFormik } from "formik";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as yup from "yup";
import theme from "../constants/theme";
import useAuthStorage from "../hooks/useAuthStorage";
import useSignIn from "../hooks/useSignIn";
import Text from "./Text";

const SignIn = () => {
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage();
  const [signIn, result] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      const accessToken = data.authenticate.accessToken;
      await authStorage.setAccessToken(accessToken);
      apolloClient.resetStore()
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  const usernameError = formik.touched.username && formik.errors.username;
  const passwordError = formik.touched.password && formik.errors.password;

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        style={[styles.input, usernameError && { borderColor: "#d73a4a" }]}
      />
      {usernameError && (
        <Text style={{ color: "#d73a4a" }}>{usernameError}</Text>
      )}

      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        style={[styles.input, passwordError && { borderColor: "#d73a4a" }]}
        secureTextEntry
      />
      {passwordError && (
        <Text style={{ color: "#d73a4a" }}>{passwordError}</Text>
      )}

      <Pressable onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={styles.submitBtn}>
          {result.loading ? "Signing in..." : "Sign in"}
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;

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
  password: yup.string().required("Password is required"),
});
