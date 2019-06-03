import React, { Component } from 'react'
import { BackHandler, Image } from 'react-native'
import { Container, Text, View } from 'native-base'
import { connect } from 'react-redux'
import SearchParkingActions from '../../../../Redux/SearchParking';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Header, Button, SvgIcon, ScrollView } from '../../../../Components'
import { Colors, Images } from '../../../../Themes'

import styles from '../../../Styles/ParkingDetailsStyle'
import { screenWidth } from '../../../../Lib/platfrom'

class ParkingDetails extends Component {
  componentDidMount () {    
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack()
      return true
    })
    const parkingId = this.props.navigation.getParam('id')
    this.props.fetchParkingItem(parkingId)
  }

  goToBack = () => {
    this.props.navigation.goBack()
  }

  handlePressViewMap = () => {
    this.props.navigation.navigate('ParkingMapView')
  }

  onRefresh = () => {
    const parkingId = this.props.navigation.getParam('id')
    this.props.fetchParkingItem(parkingId)
  }

  render () {
    const { parking } = this.props
    return (
      <Container>
        {parking && (
          <>
            <Header
              text={parking.name}
              leftIcon="back_arrow"
              onPressLeft={this.goToBack}
              rightIcons={['notifications']}
              navigation={this.props.navigation}
            />
            <ScrollView onRefresh={this.onRefresh}>
              <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{ width: screenWidth, height: 162 }}
                initialRegion={{
                  latitude: parseFloat(parking.lng || 0),
                  longitude: parseFloat(parking.ltd || 0),
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
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
              <View style={styles.container}>
                <View style={styles.parkingContainer}>
                  <View style={[styles.parkingState, { backgroundColor: parking.fillCount === parking.parkingCount ? Colors.secondary : Colors.primary.base }]}>
                    <Text style={styles.parkingStateText}>{`${parking.capacity = parking.available}/${parking.capacity}`}</Text>
                  </View>
                  <View style={styles.parkingDetails}>
                    <Text style={styles.occupiedText}>{`${parking.capacity = parking.available} occupied`}</Text>
                    <Text style={styles.emptyText}>{`${parking.available} empty`}</Text>
                    <Text style={styles.totalText}>{`${parking.capacity} total`}</Text>
                  </View>
                </View>
                <View style={styles.addressTextContainer}>
                  <SvgIcon
                    name="address"
                    size={14}
                    color={Colors.grey}
                  />
                  <Text style={styles.greyText}>Address</Text>
                </View>
                <View style={styles.addressContainer}>
                  <Text style={styles.blackText}>{parking.address}</Text>
                  <Text style={[styles.greyText, { marginTop: 5 }]}>{`(${parking.mile || "-"} miles away from you)`}</Text>
                </View>
                <View style={styles.hourlyContainer}>
                  <SvgIcon
                    name="rate"
                    size={14}
                    color={Colors.grey}
                  />
                  <Text style={[styles.greyText]}>Hourly rate</Text>
                </View>
                <Text style={[styles.blackText, styles.rateText]}>{parking.rate}$/hour</Text>
                <Button
                  onPress={this.handlePressViewMap}
                  name="VIEW IN MAP"
                  marginTop={75}
                  leftIcon="google_maps"
                />
              </View>
            </ScrollView>
          </>
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
		parking: state.parkings.parking || null,
	};
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchParkingItem: (id) => dispatch(SearchParkingActions.fetchParkingLot(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingDetails)
