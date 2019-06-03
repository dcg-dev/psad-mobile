import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { View } from 'native-base'
import Modal from 'react-native-modal'
import { Text, Button } from '../Components'
import { Images } from '../Themes'

import styles from './Styles/AlertStyle'
export class Alert extends Component {
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    message: PropTypes.string,
    isVisable: PropTypes.bool,
    onPress: PropTypes.func
  }

  static defaultProps = {
    onPress: () => {}
  }

  render () {
    const {
      isVisable,
      title,
      message,
      type = "success",
      onPress
    } = this.props

    return (
      <Modal
        isVisible={isVisable}
        backdropOpacity={0.49}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContainer}>
          <Text
            marginTop={20}
            text={title}
            size={18}
          />
          <Image source={Images[type]} style={styles.logo}></Image>
          <Text
            marginTop={20}
            text={message}
            size={16}
            type="regular"
            opacity={0.9}
            textAlign="center"
          />
          <Button
            marginTop={25}
            marginBottom={16}
            onPress={onPress}
            name="OK"
          />
        </View>
      </Modal>
    )
  }
}
