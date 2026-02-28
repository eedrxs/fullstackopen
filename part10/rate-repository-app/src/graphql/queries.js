import { gql } from "@apollo/client";
import { REPO_DETAILS, REVIEW_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $searchKeyword: String
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(
      searchKeyword: $searchKeyword
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      edges {
        node {
          ...RepoDetails
        }
      }
    }
  }

  ${REPO_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepoDetails
      reviews {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }

  ${REPO_DETAILS}
  ${REVIEW_DETAILS}
`;

export const GET_ME = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }

  ${REVIEW_DETAILS}
`;
