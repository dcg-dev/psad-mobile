import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Input, List, ListItem } from 'native-base';
import { TouchableOpacity } from 'react-native';
import styles from './Styles/SelectStyle';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors, Fonts } from '../Themes';
import { SvgIcon } from '../Components';


export class SelectInput extends Component {

  static propTypes = {
    onChangeText: PropTypes.func,
    setFieldValue: PropTypes.func,
    label: PropTypes.string,
    error: PropTypes.string,
    autoCapitalize: PropTypes.string,
    data: PropTypes.array
  }
  
  // Defaults for props
  static defaultProps = {
    autoCapitalize: 'none',
    data: []
  }

  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      visible: false,
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
      this.props.setFieldValue(this.props.name, value)
    }
  }

  toggleModal = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  onSelect = (item) => {
    this.setState({
      visible: false
    })

    if (this.props.onChangeText) {
      this.props.onChangeText(item.value)
    } else if (this.props.setFieldValue && this.props.name) {
      this.props.setFieldValue(this.props.name, item.value)
    }
  }

  render () {
    const { focused, visible } = this.state
    const { onChangeText, value, error, label, data, ...rest } = this.props
    return (
      <>
        <View style={[styles.container, focused && styles.focusedContainer, error && styles.errorContainer]}>
          <TouchableOpacity
            style={styles.selectContainer}
            onPress={this.toggleModal}
          >
            {!value
              ? <Text style={[styles.label, { fontSize: 14, fontFamily: Fonts.type.light, color: error ? Colors.secondary : Colors.black.lighter }]}>{ label }</Text>
              : <Text style={{ fontSize: 14, fontFamily: Fonts.type.light, color: Colors.black.base }}>{data.find(item => item.value === value).text}</Text> }
            <SvgIcon
              name='arrow_down'
              size={15}
            />
          </TouchableOpacity>
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
              {data.map(item => {
                return (
                  <TouchableOpacity
                    style={styles.modalItem}
                    key={item.value}
                    onPress={() => this.onSelect(item)}
                  >
                    <Text>{item.text}</Text>
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
