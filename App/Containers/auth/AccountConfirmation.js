import React, { Component } from 'react'
import { BackHandler, TouchableOpacity } from 'react-native'
import { Container, Content, View, Toast } from 'native-base'
import { connect } from 'react-redux'
import { Formik } from 'formik';

import { getStorage, setStorage } from '../../Services/AsyncStorage';
import styles from '../Styles/AccountConfirmationStyle';

import SignupActions from '../../Redux/RegisterRedux';
import { Alert, Header, Text, TextInput, Button } from '../../Components'
import { confirmAccountSchema } from '../../Config/Validation';
import { Metrics, Fonts, Colors } from '../../Themes';

class AccountConfirmation extends Component {

  static formRef = null

  constructor(props) {
		super(props);
		this.state = {
      validateOnChange: false,
      showAlert: false,
    };
    this.isAttempting = false;
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
    this.getEmailStorage()
  }

  componentDidUpdate(prevProps) {
    const { signup } = this.props;
    if (this.isAttempting && prevProps.signup.fetching && !signup.fetching) {
        this.isAttempting = false;
      if (signup.verified) {
        setStorage('verify_state', "verified")
        this.setState({
          showAlert: true
        })
      } else if (signup.resent) {
        Toast.show({
          text: "Resent confirmation code successfully!",
          position: "top"
        })
      } else if (signup.error) {
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

  getEmailStorage = async () => {
    try {
      const email = await getStorage("email");
      const hasJustSignedUp = this.props.navigation.getParam("signedup")
      if(hasJustSignedUp) {
        this.formRef.setFieldValue('email', email)
      }
    } catch (error) {
      console.log(error);
    }
  };

  goToBack = () => {
    this.props.navigation.goBack()
  }

  handleSubmit = (values) => {
    this.isAttempting = true;
    this.props.attemptConfirm(values)
  }

  handlePressConfirm = () => {
    this.setState({
      validateOnChange: true
    })
    this.formRef.submitForm()
  };

  handlePressResend = () => {
    this.isAttempting = true;
    const { values } = this.formRef.getFormikContext()
    this.props.attemptResendConfirm(values.email)
  }
  
  onConfirm = () => {
    this.props.navigation.navigate("LoginScreen");
    this.setState({
      showAlert: false
    })
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
          label="Confirmation code"
          value={values.confirmation_token}
          required
          name="confirmation_token"
          error={touched && errors.confirmation_token}
          setFieldValue={setFieldValue}
        />
      </View>
    )
  }

  render () {
    const { validateOnChange, showAlert } = this.state
    const hasJustSignedUp = this.props.navigation.getParam("signedup")
    return (
      <>
        <Container>
          <Header
            text="Account Confirmation"
            leftIcon="back_arrow"
            onPressLeft={this.goToBack}
          />
          {!showAlert &&
            <Content>
              <View style={styles.content}>
                {hasJustSignedUp &&
                  <Text
                    text="Registration Successful!"
                    size={16}
                    type="regular"
                    opacity={0.9}
                    marginTop={50}
                    textAlign="center"
                  />
                }
                <Text
                  text={hasJustSignedUp ? "Enter the confirmation code sent to your email below:" : "A confirmation code has been sent to your email. Please enter the code below:"}
                  marginTop={!hasJustSignedUp ? 50 : 0}
                  size={16}
                  type="regular"
                  opacity={0.9}
                  textAlign="center"
                />
                <View style={{ marginTop: 45 }} />
                <Formik
                  ref={ref => this.formRef = ref}
                  validationSchema={confirmAccountSchema}
                  validateOnChange={validateOnChange}
                  validateOnBlur={true}
                  onSubmit={this.handleSubmit}
                  render={this.renderForm}
                />

                <TouchableOpacity onPress={this.handlePressResend}>
                  <Text
                    text="Resend confirmation code"
                    type="regular"
                    size={12}
                    opacity={0.6}
                    color={Colors.black.medium}
                    marginLeft={Metrics.space.tiny}
                  />
                </TouchableOpacity>
                <Button
                  marginTop={75}
                  onPress={() => this.handlePressConfirm()}
                  name="CONFIRM ACCOUNT"
                />
              </View>
            </Content>
          }
        </Container>
        <Alert
          isVisable={showAlert}
          type="success"
          title="ACCOUNT CONFIRMED"
          message="Your account has been successfully confirmed! You may now use your login credential"
          onPress={() => this.onConfirm()}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    signup: state.signup
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptConfirm: (data) => dispatch(SignupActions.confirmRequest(data)),
    attemptResendConfirm: (email) => dispatch(SignupActions.resendRequest(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountConfirmation)
