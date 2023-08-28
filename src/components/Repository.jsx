import { useParams } from 'react-router-dom';
import { FlatList, Pressable, View } from 'react-native';
import * as Linking from 'expo-linking';
import { format } from 'date-fns'
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import theme from '../theme';

export const RepositoryItemContainer = ({item}) => {
    if (!item) {
        return (
            <Text>loading...</Text>
        );
    }
    const onPress = (url) => {
        Linking.openURL(url);
    }
    return (
      <View style={theme.repository} >
        <RepositoryItem item={item} />
        <Pressable onPress={() => onPress(item.url)} style={theme.centeredButton}>
          <Text style={{color: 'white'}} >Open in GitHub</Text>
        </Pressable>
      </View>
    );
};

const ReviewItem = ({ review }) => {
    return (
        <View style={theme.ratingList}>
          <View>
            <View style={theme.rating}>
                <Text fontWeight="bold" color="primary" >{review.rating}</Text>
            </View>
          </View>
            <View style={theme.ratingText} >
                <Text fontWeight="bold">{review.user.username}</Text>
                <Text color="textSecondary">{format(new Date(review.createdAt),"dd.MM.yyyy")}</Text>
                <Text >{review.text}</Text>
            </View>
        </View>
    );
  };

export const Repository = () => {
    let { id } = useParams();
    const { repository, fetchMore } = useRepository({
      id: id,
      first: 5,
    });
    const reviews = repository ? repository.reviews.edges.map((edge) => edge.node) : [];

    const onEndReach = () => {
      fetchMore();
    };

    return (   
      <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItemContainer item={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      />
    );
};

export default Repository;
