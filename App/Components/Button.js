import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button as NButton, Text } from 'native-base'
import { TouchableOpacity, View } from 'react-native'
import { Colors, Fonts } from '../Themes';
import { SvgIcon } from './SvgIcon';
import styles from './Styles/ButtonStyle';

export class Button extends Component {
  // Prop type warnings
  static propTypes = {
    name: PropTypes.string,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    onPress: PropTypes.func,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    padding: PropTypes.number,
    opacity: PropTypes.number,
    style: PropTypes.any,
    disabled: PropTypes.bool
  }
  
  // Defaults for props
  static defaultProps = {
    onPress: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      pressStatus: false
    }
  }

  render () {
    const {
      name = "",
      leftIcon = "",
      rightIcon = "",
      onPress,
      marginTop = 0,
      marginLeft = 0,
      marginRight = 0,
      marginBottom = 0,
      padding = 0,
      opacity = 1,
      style = {},
      disabled = false,
      bordered = false,
      ...rest
    } = this.props
    const { pressStatus } = this.state
    const color = !bordered ? Colors.white.base : disabled ? Colors.black.light : Colors.black.base
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => this.setState({ pressStatus: true })}
        onPressOut={() => this.setState({ pressStatus: false })}
        style={[
          styles.container,
          {
            backgroundColor: bordered ? Colors.white.base : disabled ? Colors.black.light : pressStatus ? '#60b7ff' : Colors.primary.base,
            borderWidth: bordered ? 1 : 0,
            borderColor: disabled ? Colors.black.light : Colors.primary.base,
            borderStyle: 'solid',
            marginTop,
            marginBottom,
            marginLeft,
            marginRight,
            padding,
            opacity,
            ...style
          },
          pressStatus && styles.activeContainer
        ]}
        disabled={disabled}
        activeOpacity={1}
        {...rest}
      >
        {leftIcon !== '' && <SvgIcon
            name={leftIcon}
            color={color}
          />}
          <Text
            style={{
              color,
              fontFamily: Fonts.type.light,
              fontSize: Fonts.size.medium,
              opacity: 1,
              marginLeft: 5,
              marginRight: 5
            }}
          >
            {name}
          </Text>
          {rightIcon !== '' && <SvgIcon
            name={rightIcon}
            color={color}
          />}
      </TouchableOpacity>
    )
  }
}
