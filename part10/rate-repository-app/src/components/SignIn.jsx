import { useApolloClient } from "@apollo/client/react";
import useAuthStorage from "../hooks/useAuthStorage";
import useSignIn from "../hooks/useSignIn";
import SignInContainer from "./SignInContainer";

const SignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [signIn, result] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      const accessToken = data.authenticate.accessToken;
      await authStorage.setAccessToken(accessToken);
      apolloClient.resetStore();
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} result={result} />;
};

export default SignIn;
