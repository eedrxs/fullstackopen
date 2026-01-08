import { FlatList, View } from "react-native";
import RepositoryItem from "../components/RepositoryItem";

const RepositoryListContainer = ({ repositories }) => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repo={item} />}
    />
  );
};

export default RepositoryListContainer;

const ItemSeparator = () => <View style={{ height: 10 }} />;
