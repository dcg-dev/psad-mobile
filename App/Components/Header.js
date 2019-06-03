import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Badge } from 'native-base';
import styles from './Styles/HeaderStyle';
import { Fonts, Colors } from '../Themes';
import { SvgIcon } from '../Components';
import _ from 'lodash'

export class Header extends Component {
  // Prop type warnings
  static propTypes = {
    onPressLeft: PropTypes.func,
    onPressRight: PropTypes.func,
    backgroundColor: PropTypes.string,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    leftIcon: PropTypes.any,
    rightIcons: PropTypes.array,
    textAlign: PropTypes.string,
    height: PropTypes.number
  }
  
  // Defaults for props
  static defaultProps = {
    onPressLeft: () => {},
    onPressRight: (index) => {},
    backgroundColor: Colors.primary.base,
    color: Colors.white.base,
    textAlign: 'left',
    height: 56
  }

  onPressRight = (icon) => {
    switch ( icon ) {
      case 'notifications': // for the notification icon is first placed
        this.props.navigation.navigate('NotificationsScreen', { ...this.props.navigation.state })
        break;
      default:
        this.props.onPressRight(0)
        break;
    }
  }
    
  render () {
    const {
      backgroundColor,
      color,
      onPressLeft,
      onPressRight,
      text,
      leftIcon,
      rightIcons,
      textAlign,
      height
    } = this.props
    const isAlertExist = _.indexOf(rightIcons, 'notifications') >= 0  // check for the badge for the notification
    return (
      <View style={[styles.container, { backgroundColor, height }]}>
        <View style={styles.sideContainer} >
          {leftIcon && (
            <SvgIcon
              marginRight={20}
              onPress={onPressLeft}
              name={leftIcon}
              color={color}
            />   
          )}
        </View>
        <View style={[styles.body, { textAlign }]}>
          <Text style={{ color, fontSize: Fonts.size.large }}>{text}</Text>
        </View>
        <View
          style={styles.sideContainer}
        >
        {rightIcons && rightIcons.map((icon, index) => (
          <SvgIcon
            key={index}
            onPress={() => this.onPressRight(icon)}
            marginRight={20}
            name={icon}
            color={color}
          />
        ))}
        { // if notfication icon is on the header show the badge
          isAlertExist &&
          <Badge style={styles.badgeContainer}>
            <Text style={styles.badgeText}>2</Text>
          </Badge>
        }
        </View>
      </View>
    )
  }
}
