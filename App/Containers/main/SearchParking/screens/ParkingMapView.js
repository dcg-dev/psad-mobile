import React, { Component } from 'react'
import { BackHandler, TouchableOpacity } from 'react-native'
import { Content, Text, View, Input, Button } from 'native-base'
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { screenWidth, screenHeight } from '../../../../Lib/platfrom'
import { Colors, Images } from '../../../../Themes'
import { SvgIcon } from '../../../../Components'
// Styles
import styles from '../../../Styles/ParkingMapViewStyle'

class ParkingMapView extends Component {

  constructor (props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })

    this.setState({
      searchText: `${this.props.parking.name}, ${this.props.parking.address}`
    })
  }

  render () {
    const { searchText } = this.state
    const { parking } = this.props
    return (
      <Content>
        {parking && (
          <>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={{ width: screenWidth, height: screenHeight }}
              region={{
                latitude: parseFloat(parking.lng || 0),
                longitude: parseFloat(parking.ltd || 0),
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
               <MapView.Marker
                coordinate={{
                  latitude: parseFloat(parking.lng || 0),
                  longitude: parseFloat(parking.ltd || 0),
                }}
                image={Images.locationMarker}
              />
            </MapView>
            <View style={styles.header}>
              <SvgIcon
                name="back_arrow"
                onPress={() => this.props.navigation.goBack()}
              />
              <Input
                value={searchText}
                style={styles.parkingSearchInput}
              />
              <SvgIcon
                name="clear"
                onPress={() => this.props.navigation.goBack()}
              />
              <SvgIcon
                name="microphone"
                onPress={() => this.props.navigation.goBack()}
              />
            </View>
            <TouchableOpacity style={styles.fullButton}>
              <SvgIcon
                name="filter_none"
                size={20}
                color={Colors.black.medium}
                opacity={0.7}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationButton}>
              <SvgIcon
                name="near_me"
                size={20}
                color={Colors.black.medium}
                opacity={0.7}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.currenLocationButton}>
              <SvgIcon
                name="my_location"
                size={20}
                color={Colors.black.medium}
                opacity={0.7}
              />
            </TouchableOpacity>
            <View style={styles.parkingContainer}>
              <View style={styles.addressContainer}>
                <View style={styles.addressTextContainer}>
                  <SvgIcon
                    name="address"
                    size={22}
                    color={Colors.grey}
                  />
                  <Text style={styles.greyText}>Address</Text>
                </View>
                <Text style={[styles.blackText, { marginTop: 10 }]}>{parking.address}</Text>
              </View>
              <View style={styles.routeBtn}>
                <Button>
                  <Text>ROUTE</Text>
                </Button>
              </View>
            </View>
          </>
        )}
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    parking: state.parkings.parking || null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingMapView)
