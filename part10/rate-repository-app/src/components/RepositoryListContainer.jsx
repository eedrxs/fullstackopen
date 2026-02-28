import { FlatList, Pressable, View } from "react-native";
import RepositoryItem from "../components/RepositoryItem";
import { useSearchParams } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useDebouncedCallback } from "use-debounce";
import SearchBar from "./SearchBar";
import { Component, useState } from "react";

class RepositoryListContainer extends Component {
  renderHeader = () => {
    return <ListHeader params={this.props.params} />;
  };

  render() {
    const { repositories, navigate } = this.props;
    return (
      <FlatList
        data={repositories}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repo/${item.id}`)}>
            <RepositoryItem repo={item} />
          </Pressable>
        )}
      />
    );
  }
}

export default RepositoryListContainer;

const ItemSeparator = () => <View style={{ height: 10 }} />;

const ListHeader = ({ params }) => {
  const [_, setSearchParams] = useSearchParams();
  const { searchKeyword, orderBy, orderDirection } = params;
  const sortValue = `${orderBy}.${orderDirection}`;
  const [search, setSearch] = useState(searchKeyword || "");

  const debouncedSearch = useDebouncedCallback(
    (searchKeyword) =>
      setSearchParams({
        searchKeyword,
        ...(orderBy && { orderBy }),
        ...(orderDirection && { orderDirection }),
      }),
    1000,
  );

  return (
    <View style={{ gap: 4 }}>
      <SearchBar
        value={search}
        onChangeText={(value) => {
          setSearch(value);
          debouncedSearch(value);
        }}
      />

      <Picker
        selectedValue={sortValue}
        onValueChange={(value) => {
          const [orderBy, orderDirection] = value.split(".");
          setSearchParams({
            orderBy,
            orderDirection,
            ...(searchKeyword && { searchKeyword }),
          });
        }}
        style={{ marginHorizontal: 12 }}
      >
        <Picker.Item label="Latest repositories" value="CREATED_AT.DESC" />
        <Picker.Item
          label="Highest rated repositories"
          value="RATING_AVERAGE.DESC"
        />
        <Picker.Item
          label="Lowest rated repositories"
          value="RATING_AVERAGE.ASC"
        />
      </Picker>
    </View>
  );
};
