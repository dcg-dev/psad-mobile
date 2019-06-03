import React, { Component } from 'react'

import { connect } from 'react-redux'
import _ from 'lodash'
import SearchParkingActions from '../../../Redux/SearchParking';
import { BackHandler, Image, View, ScrollView, TouchableOpacity } from 'react-native'
import { Container, Text } from 'native-base'
import styles from '../../Styles/HomeScreenStyle'
import { Header, SvgIcon, Button } from '../../../Components'
import { Colors, Images } from '../../../Themes'

class SearchParkingIndex extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  handleMenu = () => {
    this.props.navigation.toggleDrawer()
  }

  handlePressParking = (parking) => {
    this.props.navigation.navigate('ParkingDetails', { id: parking.id })
  }

  handleGoToSearch = () => {
    this.props.navigation.navigate('ParkingSearch')
  }

  sortParking = (parkings) => {
    return _.orderBy(parkings, ['title'],['asc']);
  }

  render () {
    const parkings = this.sortParking(this.props.parkings)
    return (
      <Container>
        <Header
          text="Search Parking"
          leftIcon="menu"
          rightIcons={['notifications']}
          onPressLeft={this.handleMenu}
          navigation={this.props.navigation}
          navigation={this.props.navigation}
        />
        <View style={styles.container}>
          <Text style={styles.header}>Where are you want to park?</Text>
          <Button
            onPress={this.handleGoToSearch}
            name="SEARCH PARKING"
            marginBottom={35}
            leftIcon="search"
          />
          <Text style={styles.searchResultText}>{parkings.length ? 'You previously parked here': 'You have never parked before :('}</Text>
          {!parkings.length
            ? (<Image source={Images.searchParking} style={styles.searchImage}></Image>)
            : (
              <ScrollView style={styles.parkings}>
                {parkings.map(item => (
                  <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    key={item.id}
                    onPress={() => this.handlePressParking(item)}
                  >
                    <View style={styles.parkingItem}>
                      <View style={styles.parkingTop}>
                        <View style={[styles.parkingState, { backgroundColor: item.fillCount === item.parkingCount ? Colors.secondary : Colors.primary.base }]}>
                          <Text style={styles.parkingStateText}>{`${item.fillCount}/${item.parkingCount}`}</Text>
                        </View>
                        <View style={styles.parkingInfo}>
                          <View style={styles.parkingInfoItem}>
                            <Text style={styles.infoBlackText}>{item.title}</Text>
                            <Text style={styles.infoBlackText}>{`$${item.price}`}</Text>
                          </View>
                          <View style={[styles.parkingInfoItem, { marginTop: 10 }]}>
                            <Text style={styles.infoGreyText}>{`${item.mile} miles`}</Text>
                            <Text style={styles.infoGreyText}>{`${item.hours} hours`}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.parkingBottom}>
                        <View style={styles.parkingAddressTitle}>
                          <SvgIcon
                            name="address"
                            size={14}
                            color={Colors.grey}
                          />
                          <Text style={[styles.infoGreyText, { fontSize: 14 }]}>Address</Text>
                        </View>
                        <Text style={styles.locationText}>{item.location.address}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            {!parkings.length &&
              <Text style={styles.commentText}>
                If you want to find a parking space - enter the name in the search field above
              </Text>
            }
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
		parkings: state.parkings.previews || [],
	};
}

const mapDispatchToProps = (dispatch) => {
  return {
		attemptSearch: (search) => dispatch(SearchParkingActions.fetchParkingLots(search)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchParkingIndex)
