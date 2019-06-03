import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import styles from '../../Styles/ForgotPasswordScreenStyle';
import LoginActions from '../../../Redux/LoginRedux';
import { Content, Container } from 'native-base';
import { Header, Button, Text } from '../../../Components';

import { Images } from '../../../Themes'
class ForgotPasswordCode extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func,
		fetching: PropTypes.bool,
		attemptLogin: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.isAttempting = false;
	}

	componentWillReceiveProps(newProps) {
		this.forceUpdate();
		if (this.isAttempting && !newProps.fetching) {
			this.props.navigation.goBack();
		}
	}

	handlePressConfirm = () => {
    this.props.navigation.navigate("LoginScreen")
	};

  goToBack = () => {
    this.props.navigation.goBack()
  }

	render() {
		return (
      <Container>
        <Header
          text="Forgot Password"
          leftIcon="back_arrow"
          onPressLeft={this.goToBack}
        />
        <Content>
          <View style={[styles.content, styles.center]}>
            <Text
              text="SUCCESS"
              marginTop={45}
              marginBottom={30}
              textAlign="center"
              size={22}
            />
            <Image source={Images.success} style={styles.successImage}></Image>
            <Text
              text="Password Reset link sent to your email  *******mail.com"
              size={16}
              type="regular"
              opacity={0.9}
              textAlign="center"
              marginTop={35}
            />
            <Text
              text="Please check your inbox"
              size={16}
              type="regular"
              opacity={0.9}
              textAlign="center"
              marginBottom={35}
            />
            <Button
              marginTop={20}
              onPress={this.handlePressConfirm}
              name="OK"
            />
          </View>
        </Content>
      </Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		fetching: state.login.fetching,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordCode);
