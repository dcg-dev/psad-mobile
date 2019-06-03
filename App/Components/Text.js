import React, { Component } from 'react'
import PropTypes from 'prop-types';
// import { Text as NText } from 'native-base'
import { Text as NText } from 'react-native'
import { Fonts, Colors } from '../Themes';

export class Text extends Component {
  // Prop type warnings
  static propTypes = {
    text: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.any,
    type: PropTypes.string,
    style: PropTypes.any,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    padding: PropTypes.number,
    opacity: PropTypes.number,
    textAlign: PropTypes.string
  }
  
  // Defaults for props
  static defaultProps = {
    text: ""
  }

  render () {
    const {
      text = "",
      size = 14,
      type = "medium",
      style = {},
      marginTop = 0,
      marginBottom = 0,
      marginLeft = 0,
      marginRight = 0,
      padding = 0,
      color = Colors.black.base,
      opacity = 1,
      textAlign = 'left',
      ...rest
    } = this.props
    return (
      <NText
        style={{
          fontSize: size,
          fontFamily: Fonts.type[type],
          color,
          opacity,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          padding,
          textAlign,
          ...style
        }}
        {...rest}
      >
        {text}
      </NText>
    )
  }
}
