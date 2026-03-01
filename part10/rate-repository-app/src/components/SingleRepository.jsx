import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";
import Text from "./Text";
import { FlatList, View } from "react-native";
import ReviewItem from "./ReviewItem";

const SingleRepository = () => {
  const { id: repositoryId } = useParams();
  const variables = { repositoryId, first: 3 };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: "cache-and-network",
    skip: !repositoryId,
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

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repo={repository} />}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
