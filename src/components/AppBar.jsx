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

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data, error } = useQuery(ME, { fetchPolicy: 'cache-and-network', });
  const token = authStorage.getAccessToken();
  const [signedIn, setSignedIn] = useState(false);

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    setSignedIn((data && data.me) ? true : false);
  }, []);

  useEffect(() => {
    setSignedIn((data && data.me) ? true : false);
  }, [token]);

  const signOut = () => {
    setSignedIn(false);
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  }
  if (!signedIn) {
    return (
      <View style={theme.appBarContainer}>
        <ScrollView horizontal style={theme.scrollView}>
          <AppBarTab text="Repositories" linkTo='/' />
          <AppBarTab text='Sign in' linkTo="/signIn" />
          <AppBarTab text='Sign up' linkTo="/signUp" />
        </ScrollView>
      </View>);
  }
  return (
    <View style={theme.appBarContainer}>
      <ScrollView horizontal style={theme.scrollView}>
        <AppBarTab text="Repositories" linkTo='/' />
        <AppBarTab text="My reviews" linkTo='/myReviews' />        
        <AppBarTab text="Ceate a review" linkTo='/createReview' />
        <SignOutTab signOut={signOut} />
      </ScrollView>
    </View>);
};

export default AppBar;