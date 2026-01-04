import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-native";
import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => {
  const navigate = useNavigate();
  const [mutate, result] = useMutation(AUTHENTICATE, {
    onCompleted: (res) => {
      navigate("/");
    },
  });

  const signIn = async ({ username, password }) => {
    return mutate({ variables: { credentials: { username, password } } });
  };

  return [signIn, result];
};

export default useSignIn;
