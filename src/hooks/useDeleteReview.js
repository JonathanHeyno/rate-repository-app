import { useMutation } from '@apollo/client';
import { DELETE } from '../graphql/mutations';

const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE);
  
    const deleteReview = async ({ id }) => {
      const mutationResult = await mutate({variables: { deleteReviewId: id }});

      return mutationResult;
    };

    return [deleteReview, result];
};

export default useDeleteReview;