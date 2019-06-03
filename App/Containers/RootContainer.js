import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import { Root } from 'native-base';
import { RootNavigator } from '../Navigation/AppNavigation';
import { connect } from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
import LoginActions from '../Redux/LoginRedux';
import UserActions from '../Redux/UserRedux';
import { Platform } from '../Lib/platfrom';
// Styles
import styles from './Styles/RootContainerStyles';

class RootContainer extends Component {
	static propTypes = {
    startup: PropTypes.func,
    token: PropTypes.string,
    user: PropTypes.object,
		loginSuccess: PropTypes.func
  };

	componentDidMount() {
		// if redux persist is not active fire startup action
		if (!ReduxPersist.active) {
			this.props.startup();
		}
	}

	componentDidUpdate(prevProps) {
    const { token } = this.props;
    if (prevProps.token === undefined && token !== null) {
			this.props.loginSuccess(token);
			this.props.getUser();
    }
  }

	render() {
		const { token } = this.props;
		const AppNavigator = RootNavigator();
		const statusBarStyle = Platform.isIos ? "dark-content" : "light-content"
		return (
			<Root>
				<View style={styles.applicationView}>
					<StatusBar barStyle={statusBarStyle} />
					<AppNavigator />
				</View>
			</Root>
		);
	}
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
	startup: () => dispatch(StartupActions.startup()),
	loginSuccess: token => dispatch(LoginActions.loginSuccess(token)),
	getUser: () => dispatch(UserActions.userRequest())
});

export default connect(null, mapDispatchToProps)(RootContainer);
