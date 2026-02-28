import { useNavigate, useSearchParams } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";
import Text from "./Text";

const RepositoryList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("searchKeyword");
  const orderBy = searchParams.get("orderBy");
  const orderDirection = searchParams.get("orderDirection");

  const params = {
    ...(searchKeyword && { searchKeyword }),
    ...(orderBy && { orderBy }),
    ...(orderDirection && { orderDirection }),
  };

  const { repositories, loading } = useRepositories(params);

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  if (loading) {
    return (
      <Text style={{ marginLeft: 20, marginTop: 20 }}>
        Fetching repositories...
      </Text>
    );
  }

  return (
    <RepositoryListContainer
      navigate={navigate}
      repositories={repositoryNodes}
      params={params}
    />
  );
};

export default RepositoryList;

// const repositories = [
//   {
//     id: "jaredpalmer.formik",
//     fullName: "jaredpalmer/formik",
//     description: "Build forms in React, without the tears",
//     language: "TypeScript",
//     forksCount: 1589,
//     stargazersCount: 21553,
//     ratingAverage: 88,
//     reviewCount: 4,
//     ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
//   },
//   {
//     id: "rails.rails",
//     fullName: "rails/rails",
//     description: "Ruby on Rails",
//     language: "Ruby",
//     forksCount: 18349,
//     stargazersCount: 45377,
//     ratingAverage: 100,
//     reviewCount: 2,
//     ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4",
//   },
//   {
//     id: "django.django",
//     fullName: "django/django",
//     description: "The Web framework for perfectionists with deadlines.",
//     language: "Python",
//     forksCount: 21015,
//     stargazersCount: 48496,
//     ratingAverage: 73,
//     reviewCount: 5,
//     ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4",
//   },
//   {
//     id: "reduxjs.redux",
//     fullName: "reduxjs/redux",
//     description: "Predictable state container for JavaScript apps",
//     language: "TypeScript",
//     forksCount: 13902,
//     stargazersCount: 52869,
//     ratingAverage: 0,
//     reviewCount: 0,
//     ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4",
//   },
// ];
