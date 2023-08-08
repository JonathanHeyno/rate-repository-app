import { Pressable, View, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import theme from '../theme';
import Text from './Text';

const AppBarTab = ({text='', linkTo='/'}) => {
  return (
    <Pressable>
      <Link to={linkTo}>
        <Text use="appBar">{ text }</Text>
      </Link>
    </Pressable>
);
};

const AppBar = () => {
  return (
    <View style={theme.appBarContainer}>
      <ScrollView horizontal style={theme.scrollView}>
        <AppBarTab text="Repositories" linkTo='/' />
        <AppBarTab text="Sign in" linkTo="/SignIn" />
      </ScrollView>
    </View>);
};

export default AppBar;