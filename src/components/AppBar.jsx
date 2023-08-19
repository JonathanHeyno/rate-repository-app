import { useState, useEffect } from 'react';
import { Pressable, View, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import { useQuery, useApolloClient } from '@apollo/client';
import theme from '../theme';
import Text from './Text';
import useAuthStorage from '../hooks/useAuthStorage';
import { ME } from '../graphql/queries';

const AppBarTab = ({text='', linkTo='/'}) => {
  return (
    <Pressable>
      <Link to={linkTo}>
        <Text use="appBar">{ text }</Text>
      </Link>
    </Pressable>
  );
};

const SignOutTab = ({signOut}) => {
  return (
    <Pressable onPress={signOut}>
        <Text use="appBar">Sign out</Text>
    </Pressable>
  );
};

// const reducer = (state, action) => {
//   if (action.type === 'sign_out') {
//     return {
//       signText: 'Sign in'
//     };
//   }
//   throw Error('Unknown action.');
// }

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data, error, loading } = useQuery(ME, { fetchPolicy: 'cache-and-network', });
  // const [user, setUser] = useState(null);
  const token = authStorage.getAccessToken();
  const [signedIn, setSignedIn] = useState(false);
  //const [signedIn, setSignedIn] = useState({me: null});

  console.log('TOKEN ORIG=')
  console.log(token)
  console.log('signedIn ORIG=')
  console.log(signedIn)
  console.log('data ORIG')
  console.log(data)

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    console.log('OLLAAN USE EFFECTISSA')
    console.log(data)
    //setSignedIn(data ? true : false);
    setSignedIn((data && data.me) ? true : false);
    //setSignedIn(data ? data.me : null);
    console.log('SignedIn USE EFFECT=')
    console.log(signedIn)
    console.log('data efekti')
    console.log(data)
  }, []);

  useEffect(() => {
    console.log('OLLAAN TOKEN MUUTOKSESSA')
    console.log(data)
    setSignedIn((data && data.me) ? true : false);
    console.log('SignedIn TOKEN MUUTOS=')
    console.log(signedIn)
    console.log('data token muutos')
    console.log(data)
  }, [token]);

  //console.log(user)

  // useEffect(() => {
  //   console.log('OLLAAN USE EFFECTISSA 222')
  //   console.log(user)
  // }, [user]);

  const signOut = () => {
    console.log('SUORITETAAN SIGN OUT!!!')
    // console.log(user)
    // setUser(null)
    setSignedIn(false);
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  }
  if (!signedIn) {
    return (
      <View style={theme.appBarContainer}>
        <ScrollView horizontal style={theme.scrollView}>
          <AppBarTab text="Repositories" linkTo='/' />
          <AppBarTab text='Sign In' linkTo="/SignIn" />
        </ScrollView>
      </View>);
  }
  return (
    <View style={theme.appBarContainer}>
      <ScrollView horizontal style={theme.scrollView}>
        <AppBarTab text="Repositories" linkTo='/' />
        <SignOutTab signOut={signOut} />
      </ScrollView>
    </View>);
};

export default AppBar;