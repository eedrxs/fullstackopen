import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";
import Text from "./Text";
import { FlatList, View } from "react-native";
import ReviewItem from "./ReviewItem";

const SingleRepository = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: "cache-and-network",
    skip: !id,
  });

  if (!data) {
    return (
      <Text style={{ marginLeft: 20, marginTop: 20 }}>
        Fetching repository...
      </Text>
    );
  }

  const { repository } = data;
  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repo={repository} />}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
    />
  );
};

export default SingleRepository;