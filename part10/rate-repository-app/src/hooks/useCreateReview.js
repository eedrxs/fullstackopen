import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-native";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const navigate = useNavigate();
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onCompleted: (res) => {
      console.log(res);
      // navigate(`/repo/`);
    },
  });

  const createReview = async ({ ownerName, rating, repositoryName, text }) => {
    return mutate({
      variables: {
        review: {
          ownerName,
          rating,
          repositoryName,
          text,
        },
      },
    });
  };

  return [createReview, result];
};

export default useCreateReview;
