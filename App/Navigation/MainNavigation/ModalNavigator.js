import { createStackNavigator } from 'react-navigation';

// screens identified by the router
import ParkingDetails from '../../Containers/main/SearchParking/screens/ParkingDetails';
import ParkingMapView from '../../Containers/main/SearchParking/screens/ParkingMapView';
import ParkingSearch from '../../Containers/main/SearchParking/screens/ParkingSearch';
import ParkingTransactionsFilters from '../../Containers/main/MyParking/screens/ParkingTransactionsFilters';
import NotificationFilters from '../../Containers/main/Notifications/screens/NotificationFilters';

export const ModalNavigator = createStackNavigator(
	{
    ParkingSearch: { screen: ParkingSearch },
    ParkingDetails: { screen: ParkingDetails },
    ParkingMapView: { screen: ParkingMapView },
    ParkingTransactionsFilters: { screen: ParkingTransactionsFilters },
    NotificationFilters : { screen: NotificationFilters }
	},
	{
    mode: "modal",
    initialRouteKey: null,
    headerMode: "none",
    cardStyle: {
      shadowColor: "transparent"
    },
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);
