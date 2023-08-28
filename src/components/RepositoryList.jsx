import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FlatList, View, Pressable, StyleSheet } from 'react-native';
import { useDebounce } from 'use-debounce';
import {Picker} from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({sortingChoice, selectChoice, onChangeSearch, searchKeyword}) => {
  return (
    <View>
    <Picker
      selectedValue={sortingChoice}
      prompt='Select an item'
      onValueChange={(itemValue, itemIndex) =>
        selectChoice(itemValue)
      }>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchKeyword}
    />
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <RepositoryListHeader
        sortingChoice={props.sortingChoice}
        selectChoice={props.selectChoice}
        onChangeSearch={props.onChangeSearch}
        searchKeyword={props.searchKeyword}
      />
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={ ({item}) =>
          <Pressable onPress={() => this.props.navigate(item.id)}>
            <RepositoryItem item={item} />
          </Pressable>
        }
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    )
  }
}

const RepositoryList = () => {
  const navigate = useNavigate();

  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [sortingChoice, setSortingChoice] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const onChangeSearch = query => setSearchKeyword(query);
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);


  const selectChoice = (value) => {
    if (value === 'highest') {
      setOrderDirection('DESC');
      setOrderBy('RATING_AVERAGE');
      setSortingChoice('highest')
    }
    else if (value === 'lowest') {
      setOrderDirection('ASC');
      setOrderBy('RATING_AVERAGE');
      setSortingChoice('lowest')
    }
    else {
      setOrderDirection('DESC');
      setOrderBy('CREATED_AT');
      setSortingChoice('latest')
    }

  }
  
  const { repositories, fetchMore } = useRepositories({
    orderBy: orderBy,
    orderDirection: orderDirection,
    searchKeyword: debouncedSearchKeyword,
    first: 8,
  });

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

    const onEndReach = () => {
      fetchMore();
    };

  return (
    <View>
      <RepositoryListContainer
        repositories={repositoryNodes}
        navigate={navigate}
        sortingChoice={sortingChoice}
        selectChoice={selectChoice}
        onChangeSearch={onChangeSearch}
        searchKeyword={searchKeyword}
        onEndReach={onEndReach}
      />
    </View>
    );
};

export default RepositoryList;