import { useRef } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "./useSignIn";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    return mutate({ variables: { user: { username, password } } });
  };

  return [signUp, result];
};

export default useSignUp;
