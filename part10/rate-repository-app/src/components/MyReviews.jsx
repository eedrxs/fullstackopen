import Text from "./Text";
import { FlatList, View } from "react-native";
import ReviewItem from "./ReviewItem";
import useGetMe from "../hooks/useGetMe";

const MyReviews = () => {
  const { data, refetch } = useGetMe({ includeReviews: true });

  if (!data) {
    return (
      <Text style={{ marginLeft: 20, marginTop: 20 }}>Fetching reviews...</Text>
    );
  }

  const { me } = data;
  const reviews = me?.reviews?.edges?.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} refetch={refetch} isMyReview />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  );
};

export default MyReviews;
