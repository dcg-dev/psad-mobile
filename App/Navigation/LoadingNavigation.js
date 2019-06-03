import { createStackNavigator } from 'react-navigation';

// screens identified by the router
import LoadingScreen from '../Containers/LoadingScreen';

export const LoadingNavigator = createStackNavigator(
	{
        LoadingScreen: { screen: LoadingScreen }
	},
	{
    initialRouteName: "LoadingScreen",
    headerMode: "none",
  }
);
