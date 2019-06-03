import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storeToken, storeUserInfo } from '../../Services/AsyncStorage';
import styles from '../Styles/LoginScreenStyles';
import LoginActions from '../../Redux/LoginRedux';
import UserActions from '../../Redux/UserRedux';
import { Content, Container, Toast } from 'native-base';
import { View, TouchableOpacity } from 'react-native';
import { TextInput, Text, Button } from '../../Components';
import { signInSchema } from '../../Config/Validation';
import { Formik } from 'formik';
import { Metrics, Fonts, Colors } from '../../Themes';

class LoginScreen extends React.Component {

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

  componentDidUpdate(prevProps) {
    const { login } = this.props;
    // Did the login attempt complete?
    if (this.isAttempting && prevProps.login.fetching && !login.fetching) {
      this.isAttempting = false;
      if (login.loggedIn) {
        const { token } = login;
        this.saveStorage(token);
        this.props.getUser();
        this.props.navigation.navigate('main')
      } else if (login.error) {
        Object.keys(login.error).map(key => {
          if (key === "base") {
            Toast.show({
              text: login.error[key][0],
              position: "top"
            })
          }
          this.formRef.setFieldError(key, login.error[key][0])
        })
      }
    }
  }

  saveStorage = async (token, user) => {
    try {
      await storeToken(token);
    } catch (error) {
      console.log(error);
    }
  };

	handlePressLogin = () => {
    this.setState({
      validateOnChange: true
    })
    this.formRef.submitForm()
	};

  handleSubmit = (values) => {
    this.isAttempting = true;
    this.props.attemptLogin(values.email, values.password);
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
          label="E-mail"
          value={values.email}
          required
          name="email"
          error={touched && errors.email}
          setFieldValue={setFieldValue}
        />
        <TextInput
          label="Password"
          value={values.password}
          required
          name="password"
          secureTextEntry={true}
          error={touched && errors.password}
          setFieldValue={setFieldValue}
        />
      </View>
    )
  }

	render() {
    const { validateOnChange } = this.state;
		return (
      <Container>
        <Content>
          <View style={styles.content}>

            <View style={styles.spaceLarge}>
              <Text
                text="LOG IN"
                color={Colors.primary.base}
                type="medium"
                size={Fonts.size.big}
              />
            </View>
            <View style={[styles.center, { paddingLeft: Metrics.space.small, paddingRight: Metrics.space.small, marginTop: Metrics.space.small }]}>
              <Text
                text="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do"
                type="regular"
                size={Fonts.size.medium}
                opacity={0.9}
                textAlign="center"
              />
            </View>
            <View style={{ marginTop: Metrics.space.large }}></View>

            <Formik
              ref={ref => this.formRef = ref}
              validationSchema={signInSchema}
              validateOnChange={validateOnChange}
              validateOnBlur={true}
              onSubmit={this.handleSubmit}
              render={this.renderForm}
            />

            <TouchableOpacity onPress={() => this.props.navigation.navigate("ForgotPasswordScreen")}>
              <Text
                text="Forgot Password?"
                type="regular"
                size={12}
                opacity={0.6}
                color={Colors.black.medium}
                marginLeft={Metrics.space.tiny}
              />
            </TouchableOpacity>
            <View style={{ marginTop: Metrics.space.large }} />
            <Button
              onPress={() => this.handlePressLogin()}
              name="LOG IN"
            />
            <View
              style={[styles.row, styles.center, {marginTop: Metrics.space.small}]}
            >
              <Text
                text="Don't have an account?"
                type="regular"
                size={12}
                color={Colors.black.medium}
                opacity={0.6}
              />
              <TouchableOpacity onPress={() => this.props.navigation.navigate("RegisterScreen")}>
                <Text
                  text="Register"
                  type="regular"
                  marginLeft={Metrics.space.tiny}
                  size={12}
                  color={Colors.black.medium}
                  opacity={0.9}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.spacer}></View>
            <View
              style={[styles.row, styles.center]}
            >
              <TouchableOpacity onPress={() => this.props.navigation.navigate("AccountConfirmationScreen")}>
                <Text
                  text="Account confirmation?"
                  type="regular"
                  marginRight={Metrics.space.tiny}
                  size={14}
                  color={Colors.primary.base}
                />
              </TouchableOpacity>
              <Text
                text="Click here"
                size={14}
                opacity={0.9}
              />
            </View>
          </View>
        </Content>
      </Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		login: state.login,
	};
};

const mapDispatchToProps = dispatch => {
	return {
    attemptLogin: (email, password) => dispatch(LoginActions.loginRequest(email, password)),
    getUser: () => dispatch(UserActions.userRequest())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
