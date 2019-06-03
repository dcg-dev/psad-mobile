import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native'
import { Text, SvgIcon } from '../Components'
import styles from './Styles/CheckBoxStyle'
import { Colors } from '../Themes';

export class CheckBox extends Component {
  // Prop type warnings
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func
  }
  
  // Defaults for props
  static defaultProps = {
    onPress: () => {}
  }

  render () {
    const { value, text, onPress } = this.props
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.container}
        activeOpacity={1}
      >
        <SvgIcon
          name={value ? "check" : "uncheck"}
          color={Colors.primary.base}
          size={20}
        />
        <Text
          text={text}
          size={14}
          type="regular"
          color={Colors.black.base}
          marginLeft={10}
        />
      </TouchableOpacity>
    )
  }
}
