import { useQuery } from "@apollo/client/react";
import { GET_ME } from "../graphql/queries";

const useGetMe = (variables) => {
  const query = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  return query;
};

export default useGetMe;
