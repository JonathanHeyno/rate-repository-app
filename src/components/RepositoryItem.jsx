import { View, Image } from 'react-native';
import theme from '../theme';
import Text from './Text';

const numberCorrection = (number) => {
    if (number < 1000) {
        return `${number}`;
    }
    return `${(number/1000).toFixed(1)}k`;
}

const RepositoryItem = ({item}) => (
    <View testID="repositoryItem" style={theme.repositoryItemContainer}>
      <View style={theme.repositoryItemContent}>
        <Image
            style={theme.repositoryItemPicture}
            source={{
            uri: item.ownerAvatarUrl,
            }}
        />
        <View style={theme.repositoryItemContainer}>
          <Text fontWeight="bold" >{item.fullName}</Text>
          <Text style={{color: 'textSecondary', marginRight: 45}}>{item.description}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={theme.language}>
              <Text style={{color: 'white'}}>{item.language}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={theme.repositoryItemContent}>
        <View style={theme.repositoryMinorItemContainer}>
            <Text fontWeight="bold">{numberCorrection(item.stargazersCount)}</Text>
            <Text color='textSecondary'>Stars</Text>
        </View>
        <View style={theme.repositoryMinorItemContainer}>
            <Text fontWeight="bold">{numberCorrection(item.forksCount)}</Text>
            <Text color='textSecondary'>Forks</Text>
        </View>
        <View style={theme.repositoryMinorItemContainer}>
            <Text fontWeight="bold">{numberCorrection(item.reviewCount)}</Text>
            <Text color='textSecondary'>Reviews</Text>
        </View>
        <View style={theme.repositoryMinorItemContainer}>
            <Text fontWeight="bold">{numberCorrection(item.ratingAverage)}</Text>
            <Text color='textSecondary'>Rating</Text>
        </View>
      </View>
    </View>
  );

export default RepositoryItem;