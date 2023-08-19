import { Pressable, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';

// const SignIn = () => {
//   return <Text>The sign-in view</Text>;
// };

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
  });

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput secureTextEntry name="password" placeholder="Password" />
      <Pressable onPress={onSubmit} style={theme.centeredButton}>
        <Text style={{color: 'white'}} >Sign in</Text>
      </Pressable>
    </View>
  );
};

// const SignIn = () => {
//   // const onSubmit = values => {
//   //   const username = values.username;
//   //   const password = values.password;

//   //   if (!isNaN(username) && !isNaN(password)) {
//   //     SignIn(username, password);
//   //   }
//   // };

//   const onSubmit = (values) => {
//     console.log(values);
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={onSubmit}
//       validationSchema={validationSchema}
//     >
//       {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
//     </Formik>
//   );
// };

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;