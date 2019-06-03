import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Styles/LoginScreenStyles';
import { Metrics, Fonts, Colors } from '../../Themes';
import { setStorage } from '../../Services/AsyncStorage';
import { Content, Container, Toast } from 'native-base';
import { View, TouchableOpacity } from 'react-native';
import { TextInput, PhoneInput, GoogleAutoComplete, SelectInput, Text, Button } from '../../Components';
import { Formik } from 'formik';

import { signUpSchema } from '../../Config/Validation';
import SignupActions from '../../Redux/RegisterRedux';
import { connect } from 'react-redux';

export class RegisterScreen extends React.Component {

  static formRef = null

	static propTypes = {
		dispatch: PropTypes.func,
		fetching: PropTypes.bool,
		attemptSignUp: PropTypes.func,
  };
  
	constructor(props) {
    super(props);
    this.state = {
      validateOnChange: false
    }
    this.vehicleType = [
      { text: 'Car', value: 'car' },
      { text: 'Pickup Truck', value: 'pickup-truck' },
      { text: 'Minivan', value: 'minivan' },
      { text: 'Truck', value: 'truck' }
    ]
    this.isAttempting = false;
  }
  
  componentDidUpdate(prevProps) {
    const { signup } = this.props;
    if (this.isAttempting && prevProps.signup.fetching && !signup.fetching) {
      this.isAttempting = false;
      if (signup.signedUp) {
        this.saveStorage(signup.email)
        this.props.navigation.navigate("AccountConfirmationScreen", { signedup: true });

      } else if (signup.error) {
        Object.keys(signup.error).map(key => {
          if (key === "base") {
            Toast.show({
              text: signup.error[key][0],
              position: "top"
            })
          }
          this.formRef.setFieldError(key, signup.error[key][0])
        })
      }
    }
  }

  saveStorage = async (email) => {
    try {
      await setStorage('email', email)
      await setStorage('verify_state', "unverified")
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmit = (values) => {
    if (values.password !== values.repeat_password) {
      this.formRef.setFieldError('password', "Passwords don't match")
      this.formRef.setFieldError('repeat_password', "Passwords don't match")
      return
    }
    this.isAttempting = true
    const { repeat_password, ...rest } = values
    this.props.attemptSignUp({...rest})
  }

	handlePressSignUp = () => {
    this.setState({
      validateOnChange: true
    })
    this.formRef.submitForm()
  };
  
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
          label="First name"
          value={values.first_name}
          required
          name="first_name"
          error={touched && errors.first_name}
          setFieldValue={setFieldValue}
        />
        <TextInput
          label="Last name"
          value={values.last_name}
          required
          name="last_name"
          error={touched && errors.last_name}
          setFieldValue={setFieldValue}
        />
        <TextInput
          label="E-mail"
          value={values.email}
          required
          name="email"
          error={touched && errors.email}
          setFieldValue={setFieldValue}
        />
        <PhoneInput
          label="Phone Number"
          value={values.phone}
          name="phone"
          error={touched && errors.phone}
          setFieldValue={setFieldValue}
        />
        <TextInput
          label="License plate"
          value={values.plate_number}
          name="plate_number"
          error={touched && errors.plate_number}
          setFieldValue={setFieldValue}
        />
        <SelectInput
          label="Vehicle Type"
          data={this.vehicleType}
          value={values.vehicle_type}
          required
          name="vehicle_type"
          error={touched && errors.vehicle_type}
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
        <TextInput
          label="Repeat Password"
          value={values.repeat_password}
          required
          name="repeat_password"
          secureTextEntry={true}
          error={touched && errors.repeat_password}
          setFieldValue={setFieldValue}
        />
      </View>
    )
  }

	render() {
    const { validateOnChange } = this.state
    return (
      <Container>
        <Content>
          <View style={styles.content}>
            <View style={styles.spaceLarge}>
              <Text
                text="REGISTRATION"
                color={Colors.primary.base}
                type="medium"
                size={Fonts.size.big}
              />
            </View>
            <View style={[styles.center, { paddingLeft: Metrics.space.small, paddingRight: Metrics.space.small, marginTop: Metrics.space.small }]}>
              <Text
                text="To register, please fill out the following fields:"
                type="regular"
                size={Fonts.size.medium}
                opacity={0.9}
                textAlign="center"
              />
            </View>
            <View style={{ marginTop: Metrics.space.medium }}></View>
            <Formik
              ref={ref => this.formRef = ref}
              validationSchema={signUpSchema}
              validateOnChange={validateOnChange}
              validateOnBlur={true}
              onSubmit={this.handleSubmit}
              render={this.renderForm}
            />
            <Button
              onPress={this.handlePressSignUp}
              name="REGISTER"
            />
            <View style={[styles.row, styles.center, {marginTop: Metrics.space.small}]}>
              <Text
                text="Already have an account?"
                type="regular"
                size={12}
                color={Colors.black.medium}
                opacity={0.6}
              />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("LoginScreen")}
              >
                <Text
                  text="Log in"
                  type="regular"
                  marginLeft={Metrics.space.tiny}
                  color={Colors.black.medium}
                  size={12}
                  opacity={0.9}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: Metrics.space.medium }}></View>
          </View>
        </Content>
      </Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		signup: state.signup,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		attemptSignUp: (user) => dispatch(SignupActions.signupRequest(user)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
