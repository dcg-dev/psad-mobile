import { createStackNavigator } from 'react-navigation';

// screens identified by the router
import AuthHomeScreen from '../../Containers/auth/AuthHomeScreen';
import LoginScreen from '../../Containers/auth/LoginScreen';
import RegisterScreen from '../../Containers/auth/RegisterScreen';
import ForgotPasswordScreen from '../../Containers/auth/ForgotPassword/ForgotPasswordScreen';
import ForgotPasswordCode from '../../Containers/auth/ForgotPassword/ForgotPasswordCode';
import NewPasswordScreen from '../../Containers/auth/ForgotPassword/NewPassword';
import AccountConfirmation from '../../Containers/auth/AccountConfirmation';

export const AuthNavigator = createStackNavigator(
	{
		AuthHomeScreen: { screen: AuthHomeScreen },
		LoginScreen: { screen: LoginScreen },
		RegisterScreen: { screen: RegisterScreen },
		ForgotPasswordScreen: { screen: ForgotPasswordScreen },
		ForgotPasswordCode: { screen: ForgotPasswordCode },
		NewPasswordScreen: { screen: NewPasswordScreen },
		AccountConfirmationScreen: { screen: AccountConfirmation }
	},
	{
		initialRouteName: "AuthHomeScreen",
		headerMode: "none",
	}
);
