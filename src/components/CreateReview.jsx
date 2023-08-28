import { Pressable, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useCreateReview from '../hooks/useCreateReview';

const initialValues = {
  repositoryOwnerName: '',
  repositoryName: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  repositoryOwnerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating name is required')
    .min(0)
    .max(100),
  review: yup
    .string()
  });

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => 
        <View>
          <FormikTextInput name="repositoryOwnerName" placeholder="Repository owner name" />
          <FormikTextInput name="repositoryName" placeholder="Repository name" />
          <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
          <FormikTextInput name="review" multiline numberOfLines={3} placeholder="Review" />
          <Pressable onPress={handleSubmit} style={theme.centeredButton}>
            <Text style={{color: 'white'}} >Create a review</Text>
          </Pressable>
        </View>
      }
    </Formik>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { repositoryOwnerName, repositoryName, rating, review } = values;

    try {
      await createReview({ repositoryOwnerName, repositoryName, rating, review });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CreateReviewContainer onSubmit={onSubmit} />
  );
};

export default CreateReview;