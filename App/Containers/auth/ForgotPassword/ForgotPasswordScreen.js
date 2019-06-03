import React from 'react';
import PropTypes from 'prop-types';
import { BackHandler, View } from 'react-native';
import { connect } from 'react-redux';
import styles from '../../Styles/ForgotPasswordScreenStyle';
import { Metrics, Fonts, Colors } from '../../../Themes';
import SignupActions from '../../../Redux/RegisterRedux';
import { Content, Container, Toast } from 'native-base';
import { TextInput, Header, Text, Button } from '../../../Components';
import { forgotPasswordSchema } from '../../../Config/Validation';
import { Formik } from 'formik';

class ForgotPasswordScreen extends React.Component {

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

	componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }
  
  componentDidUpdate(prevProps) {
    const { signup } = this.props;
    if (this.isAttempting && prevProps.signup.fetching && !signup.fetching) {
      console.log(signup)
      this.isAttempting = false;
      if (signup.resent) {
        this.props.navigation.navigate("ForgotPasswordCode");
      } else if (signup.error) {
        console.log("signup.error", signup.error)
        if (typeof signup.error == "string") {
          Toast.show({
            text: signup.error,
            position: "top"
          })
        } else {
          Object.keys(signup.error).map(key => {
            if (key === "base") {
              Toast.show({
                text: error[key][0],
                position: "top"
              })  
            }
            this.formRef.setFieldError(key, signup.error[key][0])
          })
        }
      }
    }
  }


	handlePressResetPassword = () => {
    this.setState({
      validateOnChange: true
    })
    this.formRef.submitForm()
	};

  handleSubmit = (values) => {
    this.isAttempting = true
    this.props.attemptResetPassword(values.email)
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
          text="Forgot Password"
          leftIcon="back_arrow"
          onPressLeft={this.goToBack}
        />
        <Content>
          <View style={styles.content}>
            <View style={styles.spaceLarge}>
              <Text
                text="Please enter your email address and we will send a letter to reset your password to your email"
                type="regular"
                size={Fonts.size.medium}
                opacity={0.9}
                textAlign="center"
              />
            </View>
            <View style={{ marginTop: Metrics.space.larger }}></View>

            <Formik
              ref={ref => this.formRef = ref}
              validationSchema={forgotPasswordSchema}
              validateOnChange={validateOnChange}
              validateOnBlur={true}
              onSubmit={this.handleSubmit}
              render={this.renderForm}
            />

            <View style={{ marginTop: Metrics.space.large + Metrics.space.large }} />
            <Button
              onPress={this.handlePressResetPassword}
              name="RESET PASSWORD"
            />
          </View>
        </Content>
      </Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		signup: state.signup
	};
};

const mapDispatchToProps = dispatch => {
	return {
		attemptResetPassword: (email) => dispatch(SignupActions.resendRequest(email))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);
