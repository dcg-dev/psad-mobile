import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import styles from '../../Styles/ForgotPasswordScreenStyle';
import { Metrics, Fonts, Colors } from '../../../Themes';
import LoginActions from '../../../Redux/LoginRedux';
import { Content, Container } from 'native-base';
import { TextInput, Header, Text, Button } from '../../../Components';
import { newPasswordSchema } from '../../../Config/Validation';
import { Formik } from 'formik';

class NewPasswordScreen extends React.Component {

  static formRef = null

	static propTypes = {
		dispatch: PropTypes.func,
		fetching: PropTypes.bool,
		attemptLogin: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
      validateOnChange: false
		};
		this.isAttempting = false;
	}

	componentWillReceiveProps(newProps) {
		this.forceUpdate();
		if (this.isAttempting && !newProps.fetching) {
			this.props.navigation.goBack();
		}
	}


	handlePressSave = () => {
    this.setState({
      validateOnChange: true
    })
    this.formRef.submitForm()
	};

  handleSubmit = (values) => {
    if (values.password !== values.confirmPassword) {
      this.formRef.setFieldError('confirmPassword', "Those passwords didn't match. Try again.")
    } else {
      this.props.navigation.navigate("LoginScreen");
    }
  }

  renderForm = (props) => {
    const {
      values,
      touched,
      errors,
      setFieldValue,
    } = props
    return (
      <View>
        <TextInput
          label="New Password"
          value={values.password}
          required
          name="password"
          secureTextEntry={true}
          error={touched && errors.password}
          setFieldValue={setFieldValue}
        />
        <TextInput
          label="Confirm Password"
          value={values.confirmPassword}
          required
          name="confirmPassword"
          secureTextEntry={true}
          error={touched && errors.confirmPassword}
          setFieldValue={setFieldValue}
        />
      </View>
    )
  }

  goToBack = () => {
    this.props.navigation.goBack()
  }

	render() {
    const { validateOnChange } = this.state;
		return (
      <Container>
        <Header
          text="New Password"
          leftIcon="back_arrow"
          onPressLeft={this.goToBack}
        />
        <Content>
          <View style={styles.content}>
            <View style={styles.spaceLarge}>
              <Text
                text="Please provide and confirm your new password"
                type="regular"
                size={Fonts.size.medium}
                opacity={0.9}
                textAlign="center"
              />
            </View>
            <View style={{ marginTop: Metrics.space.large }}></View>

            <Formik
              ref={ref => this.formRef = ref}
              validationSchema={newPasswordSchema}
              validateOnChange={validateOnChange}
              validateOnBlur={true}
              onSubmit={this.handleSubmit}
              render={this.renderForm}
            />

            <View style={{ marginTop: Metrics.space.large + Metrics.space.medium }} />
            <Button
              onPress={this.handlePressSave}
              name="SAVE PASSWORD"
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

export default connect(mapStateToProps, mapDispatchToProps)(NewPasswordScreen);
