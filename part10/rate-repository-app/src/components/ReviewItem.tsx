import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../constants/theme";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client/react";
import { DELETE_REVIEW } from "../graphql/mutations";

const ReviewItem = ({ review, refetch, isMyReview = false }) => {
  const navigate = useNavigate();

  const [mutate, result] = useMutation(DELETE_REVIEW, {
    onCompleted: () => {
      refetch();
    },
  });

  const showAlert = () =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => mutate({ variables: { reviewId: review.id } }),
          style: "cancel",
        },
      ],
      { cancelable: true },
    );

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.username}>
            {isMyReview ? review.repository.fullName : review.user.username}
          </Text>
          <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
          <Text style={styles.text}>{review.text}</Text>
        </View>
      </View>

      {isMyReview && (
        <View style={styles.ctaBtnsContainer}>
          <Pressable
            onPress={() => navigate(`/repo/${review.repository.id}`)}
            style={styles.ctaBtn}
          >
            <Text style={styles.ctaBtnText}>View repository</Text>
          </Pressable>

          <Pressable
            onPress={showAlert}
            style={[styles.ctaBtn, { backgroundColor: "red" }]}
          >
            <Text style={styles.ctaBtnText}>
              {result.loading ? "Deleting..." : "Delete review"}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({
  root: {
    gap: 10,
    padding: 12,
    backgroundColor: "white",
  },
  container: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 15,
    padding: 10,
  },
  ratingContainer: {
    borderRadius: 999999,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    flexShrink: 1,
  },
  ratingText: {
    fontWeight: 600,
    fontSize: 18,
    color: theme.colors.primary,
  },
  username: {
    fontSize: 16,
    fontWeight: 600,
  },
  date: { color: theme.colors.textSecondary, marginBottom: 4 },
  text: {},
  ctaBtnsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  ctaBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    color: "white",
    padding: 4,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  ctaBtnText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: 800,
  },
});

function formatDate(isoString) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
