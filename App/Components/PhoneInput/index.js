import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Input, List, ListItem } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import styles from '../Styles/PhoneInputStyle';
import Countries from './countries';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Colors } from '../../Themes';
import { SvgIcon } from '../../Components';

export class PhoneInput extends Component {

  static propTypes = {
    onChangeText: PropTypes.func,
    setFieldValue: PropTypes.func,
    label: PropTypes.string,
    error: PropTypes.string,
    autoCapitalize: PropTypes.string
  }
  
  // Defaults for props
  static defaultProps = {
    autoCapitalize: 'none'
  }

  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      visible: false,
      prefix: {
        areaCodes: null,
        dialCode: "1",
        icon: "https://raw.githubusercontent.com/behdad/region-flags/gh-pages/png/US.png",
        iso2: "US",
        name: "United States",
        priority: 0
      }
    }
  }

  onFocus = () => {
    this.setState({
      focused: true
    })
  }

  onBlur = () => {
    this.setState({
      focused: false
    })
  }

  setFieldValue = (value) => {
    if (this.props.setFieldValue && this.props.name) {
      this.props.setFieldValue(this.props.name, `+${this.state.prefix.dialCode}${value}`)
    }
  }

  toggleModal = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  selectPrefix = (value) => {
    this.setState({
      prefix: value,
      visible: false
    })
  }

  render () {
    const { focused, visible, prefix } = this.state
    const { onChangeText, value, error, autoCapitalize, ...rest } = this.props

    let phoneNumber = ""
    if (value) {
      phoneNumber = value.split(`+${prefix.dialCode}`)[1]
    }

    return (
      <>
        <View style={[styles.container, focused && styles.focusedContainer, error && styles.errorContainer]}>
          <TouchableOpacity
            style={styles.flagContainer}
            onPress={this.toggleModal}
          >
            <Image source={{uri: prefix.icon}} style={styles.flag}/>
            <SvgIcon
              name='arrow_down'
              size={15}
            />
          </TouchableOpacity>
          <Text style={styles.prefix}>{`+${prefix.dialCode}`}</Text>
          <Input
            value={phoneNumber}
            autoCapitalize={autoCapitalize}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            keyboardType="numeric"
            onChangeText={onChangeText || this.setFieldValue}
            style={styles.input}
            {...rest}
          />
          {error && (
            <SvgIcon
              name='error'
              color={Colors.secondary}
            />
          )}
        </View>
        <Text style={styles.errorText}>{error}</Text>
        <Modal
          isVisible={visible}
          backdropOpacity={0.2}
          animationIn="zoomInDown"
          animationOut="fadeOut"
          onBackdropPress={this.toggleModal}
        >
          <ScrollView style={styles.pickerContainer}>
            <View>
              {Countries.map(item => {
                return (
                  <TouchableOpacity
                    style={styles.modalItem}
                    key={item.iso2}
                    onPress={() => this.selectPrefix(item)}
                  >
                    <Image source={{uri: item.icon}} style={styles.flag}/>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </ScrollView>
        </Modal>
      </>
    )
  }
}
