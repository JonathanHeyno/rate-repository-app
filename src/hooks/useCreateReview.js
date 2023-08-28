import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const navigate = useNavigate();
  
    const sendReview = async ({ repositoryOwnerName, repositoryName, rating, review }) => {
      const ratingAsNumber = parseInt(rating);
      const mutationResult = await mutate({
        variables: {
            review: {
                ownerName: repositoryOwnerName,
                repositoryName: repositoryName,
                rating: ratingAsNumber,
                text: review
            }
        }
      });

      if (mutationResult.data.createReview.repositoryId) {
        navigate(`/${mutationResult.data.createReview.repositoryId}`);
      }

      return mutationResult;
    };
  
    return [sendReview, result];
};

export default useCreateReview;