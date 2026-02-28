import { gql } from "@apollo/client";

export const REPO_DETAILS = gql`
  fragment RepoDetails on Repository {
    fullName
    description
    forksCount
    id
    url
    language
    ownerAvatarUrl
    reviewCount
    stargazersCount
    ratingAverage
  }
`;

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
    repository {
      id
      fullName
    }
  }
`;
