import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// screens identified by the router
import { AuthNavigator } from './AuthNavigation'
import { MainNavigator } from './MainNavigation'
import { LoadingNavigator } from './LoadingNavigation'

export const RootNavigator = () => {
	const primaryNav = createSwitchNavigator(
		{
			auth: AuthNavigator,
			main: MainNavigator,
			loading: LoadingNavigator
		},
		{
			initialRouteName: "loading",
			headerMode: "none",
		}
	);
	return createAppContainer(primaryNav);
}

export default { RootNavigator };
