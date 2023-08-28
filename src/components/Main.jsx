import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import Repository from './Repository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="signIn" element={<SignIn />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path=":id" element={<Repository />} exact />
        <Route path="/createReview" element={<CreateReview />} exact />
        <Route path="/signUp" element={<SignUp />} exact />
        <Route path="/myReviews" element={<MyReviews />} exact />
      </Routes>
    </View>
  );
};

export default Main;