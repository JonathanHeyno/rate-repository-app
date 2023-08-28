import { Pressable, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5)
    .max(30),
  password: yup
    .string()
    .required('Password is required')
    .min(5)
    .max(50),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords do not match")
    .required('Password confirm is required')
  });

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => 
        <View>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput secureTextEntry name="password" placeholder="Password" />
          <FormikTextInput secureTextEntry name="passwordConfirm" placeholder="Password confirmation" />
          <Pressable onPress={handleSubmit} style={theme.centeredButton}>
            <Text style={{color: 'white'}} >Sign up</Text>
          </Pressable>
        </View>
      }
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signUp({ username, password });
      if (data.createUser.username) {
        await signIn({ username, password });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit} />
  );
};

export default SignUp;