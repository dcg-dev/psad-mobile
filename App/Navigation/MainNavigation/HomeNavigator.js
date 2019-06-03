import { createSwitchNavigator } from 'react-navigation';

// screens identified by the router
import MessagesScreen from '../../Containers/main/Messages';
import MyParkingScreen from '../../Containers/main/MyParking';
import QRScanScreen from '../../Containers/main/QRscan';
import SearchParkingScreen from '../../Containers/main/SearchParking';
import SettingsScreen from '../../Containers/main/Settings';
import TransactionHistoryScreen from '../../Containers/main/TransactionHistory';
import NotificationsScreen from '../../Containers/main/Notifications';

export const HomeNavigator = createSwitchNavigator(
	{
		MessagesScreen: { screen: MessagesScreen },
		MyParkingScreen: { screen: MyParkingScreen },
		QRScanScreen: { screen: QRScanScreen },
		SearchParkingScreen: { screen: SearchParkingScreen },
		SettingsScreen: { screen: SettingsScreen },
		TransactionHistoryScreen: { screen: TransactionHistoryScreen },
		NotificationsScreen: { screen: NotificationsScreen },
	},
	{
		initialRouteName: "SearchParkingScreen",
		headerMode: "none",
	}
);
