import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Input } from 'native-base';
import { Animated } from 'react-native';
import styles from '../Styles/InputStyle';
import { Colors } from '../../Themes';
import { SvgIcon } from '../../Components';

export class TextInput extends Component {
  initialLabelPosition = 14
  animatedLabelPosition = 38
  initialLabelSize = 14
  animatedLabelSize = 10
  animationDuration = 100

  static propTypes = {
    onChangeText: PropTypes.func,
    setFieldValue: PropTypes.func,
    label: PropTypes.string,
    error: PropTypes.string,
    autoCapitalize: PropTypes.string,
    leftIcon: PropTypes.string,
    onPressLeftIcon: PropTypes.func,
    flex: PropTypes.bool
  }
  
  // Defaults for props
  static defaultProps = {
    autoCapitalize: 'none'
  }

  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      labelAnimation: new Animated.Value(this.initialLabelPosition),
      labelSize: new Animated.Value(this.initialLabelSize),
      viewIconVisible: false
    }
  }

  componentDidMount() {
    if (this.props.value) {
      this.animateLabel()
    }
    this.setState({
      viewIconVisible: this.props.secureTextEntry || false
    })
  }

  onFocus = () => {
    this.setState({
      focused: true
    })
    this.animateLabel(true)
  }

  onBlur = () => {
    this.setState({
      focused: false
    })
    this.animateLabel(false)
  }

  animateLabel = (focused) => {
    Animated.parallel([
      Animated.timing(this.state.labelAnimation, {
        toValue: focused || this.props.value ? this.animatedLabelPosition : this.initialLabelPosition,
        duration: this.animationDuration
      }),
      Animated.timing(this.state.labelSize, {
        toValue: focused || this.props.value ? this.animatedLabelSize : this.initialLabelSize,
        duration: this.animationDuration
      })
    ]).start()
  }

  toggleSecureEntry = () => {
    this.setState({
      viewIconVisible: !this.state.viewIconVisible
    })
  }

  setFieldValue = (value) => {
    if (this.props.setFieldValue && this.props.name) {
      this.props.setFieldValue(this.props.name, value)
    }
  }

  render () {
    const { focused, labelAnimation, labelSize, viewIconVisible } = this.state
    const {
      onChangeText,
      label,
      value,
      error,
      secureTextEntry,
      autoCapitalize,
      placeholder,
      textAlign = "left",
      required,
      rightIcon,
      onPressRightIcon,
      flex = false,
      ...rest
    } = this.props
    return (
      <>
        <View style={[
          styles.container,
          focused && styles.focusedContainer,
          error && styles.errorContainer,
          textAlign === 'center' && { paddingLeft: 0, paddingRight: 0 },
          flex ? { flex: 1 } : { width: '100%' }
        ]}>
          {label && (
            <Animated.View
              text={required ? `${label} *` : label}
              style={[{
                top: this.props.multiline ? 0 : "auto",
                bottom: this.props.multiline ? "auto" : labelAnimation,
              }, styles.labelContainer]}
            >
              <Animated.Text
                style={[styles.label, { fontSize: labelSize, color: error ? Colors.secondary : focused ? Colors.black.base : Colors.black.lighter }]}
              >{required ? `${label} *` : label}</Animated.Text>
            </Animated.View>
          )}
          <Input
            value={value}
            autoCapitalize={autoCapitalize}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            placeholder={placeholder}
            placeholderTextColor={Colors.black.lighter}
            onChangeText={onChangeText || this.setFieldValue}
            secureTextEntry={viewIconVisible}
            style={[styles.input, textAlign === 'center' && {textAlign: "center"}]}
            {...rest}
          />
          {!error && secureTextEntry ? (
            <SvgIcon
              onPress={this.toggleSecureEntry}
              name={viewIconVisible ? 'visibility_off': 'visibility_on'}
              color={focused || this.props.value ? Colors.black.base : '#D8DBEA'}
            />
          ) : !error && rightIcon && (
            <SvgIcon
              onPress={onPressRightIcon}
              name={rightIcon}
              opacity={focused || this.props.value ? 0.9 : 0.6}
              color={focused || this.props.value ? Colors.primary.base : '#D8DBEA'}
            />
          )}
          {error && (
            <SvgIcon
              name='error'
              color={Colors.secondary}
            />
          )}
        </View>
        <Text style={styles.errorText}>{error}</Text>
      </>
    )
  }
}
