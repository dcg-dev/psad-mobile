import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Input } from 'native-base'
import { Text } from 'react-native'
import styles from './Styles/GoogleAutoCompleteStyle'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Colors } from '../Themes'

export class GoogleAutoComplete extends Component {
  // Prop type warnings
  static propTypes = {
    onChangeText: PropTypes.func,
    setFieldValue: PropTypes.func,
    error: PropTypes.string,
    label: PropTypes.string,
  }
  
  // Defaults for props
  static defaultProps = {
    error: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      focused: false
    }
  }

  setFieldValue = (value) => {
    if (this.props.setFieldValue && this.props.name) {
      this.props.setFieldValue(this.props.name, value.description)
      this.setState({
        focused: false
      })
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

  render () {
    const { error, label, onChangeText, value, required } = this.props
    const { focused } = this.state
    return (
      <View>
        {!focused ? (
          <View style={[styles.container, focused && styles.focusedContainer, error && styles.errorContainer]}>
            {!value && <View
              text={required ? `${label} *` : label}
              style={styles.labelContainer}
            >
              <Text style={[styles.label, { fontSize: 14, color: error ? Colors.secondary : Colors.black.lighter }]} >{required ? `${label} *` : label}</Text>
            </View>}
            <Input
              value={value}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              style={styles.input}
            />
          </View> ) : (
          <GooglePlacesAutocomplete
            placeholder={label}
            minLength={1} // minimum length of text to search
            autoFocus={true}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='auto'    // true/false/undefined
            // fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              onChangeText || this.setFieldValue(data)
            }}
            onBlur={this.onBlur}
            getDefaultValue={() => ''}
            query={{
              key: 'AIzaSyDSThOwgTtvD6polkUdAqHOiCCTD-OqRcw',
              language: 'en', // language of the results
            }}
            
            styles={{
              textInputContainer: {
                borderTopColor: error ? Colors.secondary : focused ? Colors.primary.base : Colors.black.lighter,
                borderBottomColor: error ? Colors.secondary : focused ? Colors.primary.base : Colors.black.lighter,
                borderColor: error ? Colors.secondary : focused ? Colors.primary.base : Colors.black.lighter,
                ...styles.textInputContainer
              },
              textInput: styles.textInput
            }}
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}

            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          />
        )}
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }
}
