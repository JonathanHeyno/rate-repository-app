import { Platform } from 'react-native';
import Constants from 'expo-constants';

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System',
      }),
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    appBarContainer: {
      // flexDirection: 'row',
      // display: 'flex',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: "#24292e",
      paddingLeft: 15,
    },
    scrollView: {
      display: 'flex',
      flexDirection: 'row',
    },
    appBarText: {
      paddingTop: 50,
      paddingBottom: 20,
      paddingRight: 15,
      color: 'white',
      fontSize: 24,
      fontWeight: '700',
    },
    repositoryItemContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 15,
        backgroundColor: "white",
        gap: 5,
        paddingTop: 5,
    },
    repositoryItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    repositoryMinorItemContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 15,
        alignItems: 'center',
        paddingBottom: 15,
    },
    repositoryItemPicture: {
        width: 50,
        height: 50,
        borderRadius: 7,
    },
    language: {
        backgroundColor: '#0366d6',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 5,
        borderRadius: 5,
        flexGrow: 0,
    },
    centeredButton: {
      backgroundColor: '#0366d6',
      margin: 12,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
  };
  
  export default theme;