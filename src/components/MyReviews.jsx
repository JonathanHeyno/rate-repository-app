import { FlatList, Pressable, View, Alert } from 'react-native';
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns'
import useReviews from '../hooks/useReviews';
import Text from './Text';
import theme from '../theme';
import useDeleteReview from '../hooks/useDeleteReview';


const ReviewItem = ({ review, refetch }) => {
    const navigate = useNavigate();
    const [deleteReview] = useDeleteReview();

    const onPress = (id) => {
        navigate(`/${id}`);
    }

    const handleDelete = async (id) => {
        try {
            await deleteReview({ id });
            await refetch();
          } catch (e) {
            console.log(e);
          }
    }

    const showAlert = (id) =>
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'CANCEL',
        style: 'cancel',
      },
      {text: 'DELETE', onPress: () => handleDelete(id)},
    ]);

    return (
        <View>
          <View style={theme.ratingList}>
            <View>
              <View style={theme.rating}>
              <Text fontWeight="bold" color="primary" >{review.rating}</Text>
              </View>
            </View>
            <View style={theme.ratingText} >
              <Text fontWeight="bold">{review.repository.fullName}</Text>
              <Text color="textSecondary">{format(new Date(review.createdAt),"dd.MM.yyyy")}</Text>
              <Text >{review.text}</Text>
            </View>
          </View>
          <View style={theme.reviewButtons}>
            <Pressable onPress={() => onPress(review.repository.id)} style={theme.centeredButton}>
              <Text style={{color: 'white'}} fontWeight='bold' >View repository</Text>
            </Pressable>
            <Pressable onPress={() => showAlert(review.id)} style={theme.deleteButton}>
              <Text style={{color: 'white'}} fontWeight='bold' >Delete review</Text>
            </Pressable>
          </View>
        </View>
    );
  };

export const ReviewsContainer = ({reviews, refetch}) => {
    if (!reviews) {
        return (
            <Text>loading...</Text>
        );
    }

    return (
        <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
        keyExtractor={({ id }) => id}
        />
    );
};

export const MyReviews = () => {
    const { result, refetch } = useReviews();
    const reviews = result ? result.me.reviews.edges.map((edge) => edge.node) : [];

    return <ReviewsContainer reviews={reviews} refetch={refetch} />;
};

export default MyReviews;
