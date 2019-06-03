import React, { Component } from 'react'

import { connect } from 'react-redux'
import _ from 'lodash'
import SearchParkingActions from '../../../../Redux/SearchParking';
import { BackHandler, Image, View, TouchableOpacity } from 'react-native'
import { Container, Text, Button } from 'native-base'
import styles from '../../../Styles/HomeScreenStyle'
import { Header, TextInput, SvgIcon, ScrollView, List } from '../../../../Components'
import { Colors, Images } from '../../../../Themes'
import { KeyboardAvoidingView } from 'react-native'

class ParkingSearch extends Component {

  constructor(props) {
    super(props)

    this.state = {
      search: '',
      showSearchButton: false
    }
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('SearchParkingScreen')
      return true
    })
    this.props.attemptSearch(this.state.search, this.props.parkings.per_page, this.props.parkings.next_page)
  }

  handleMenu = () => {
    this.props.navigation.toggleDrawer()
  }
  handleChangeSearch = (value) => {
    this.setState({
      search: value,
      showSearchButton: true
    })
  }

  handlePressSearch = () => {
    this.setState({
      showSearchButton: false
    })
    this.props.attemptSearch(this.state.search, this.props.parkings.per_page, 1)
  }

  clearSearch = () => {
    this.props.attemptSearch('', this.props.parkings.per_page, 1)
    this.setState({
      search: ''
    })
  }

  handlePressParking = (parking) => {
    this.props.navigation.navigate('ParkingDetails', { id: parking.id })
  }

  goToBack = () => {
    this.props.navigation.navigate('SearchParkingScreen')
  }

  sortParking = (parkings) => {
    return _.orderBy(parkings, ['name'],['asc']);
  }

  onRefresh = () => {
    this.props.attemptSearch(this.state.search, this.props.parkings.per_page, 1)
  }

  onEndReached = () => {
    if (!this.props.parkings.reached) {
      this.props.attemptSearch(this.state.search, this.props.parkings.per_page, this.props.parkings.next_page)
    }
  }

  renderParkingItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.parkingItem}
        key={item.id}
        onPress={() => this.handlePressParking(item)}
      >
        <View style={styles.parkingTop}>
          <View style={[styles.parkingState, { backgroundColor: item.fillCount === item.parkingCount ? Colors.secondary : Colors.primary.base }]}>
            <Text style={styles.parkingStateText}>{`${item.available - item.available}/${item.capacity}`}</Text>
          </View>
          <View style={styles.parkingInfo}>
            <View style={styles.parkingInfoItem}>
              <Text style={styles.infoBlackText}>{item.name}</Text>
              <Text style={styles.infoBlackText}>{`$${item.rate}`}</Text>
            </View>
            <View style={[styles.parkingInfoItem, { marginTop: 10 }]}>
              <Text style={styles.infoGreyText}>{`${item.mile || "-"} miles`}</Text>
              <Text style={styles.infoGreyText}>{`${item.hours || "-"} hours`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.parkingBottom}>
          <View style={styles.parkingAddressTitle}>
            <Text style={[styles.infoGreyText, { fontSize: 14 }]}>Address</Text>
          </View>
          <Text style={styles.locationText}>{item.address}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    const { search, showSearchButton } = this.state
    const parkings = this.sortParking(this.props.parkings.parkingLots || [])
    return (
      <Container>
        <Header
          text="Search Parking"
          leftIcon="back_arrow"
          onPressLeft={this.goToBack}
          rightIcons={['notifications']}
          navigation={this.props.navigation}
        />
        <View style={styles.container}>
          <Text style={styles.header}>Where are you want to park?</Text>
          <TextInput
            placeholder="Enter your destination"
            rightIcon={search ? "clear" : "search"}
            value={search}
            onChangeText={this.handleChangeSearch}
            onPressRightIcon={this.clearSearch}
          />
          <Text
            style={styles.searchResultText}
          >
            {search ? parkings.length ? `All what we found for you (${parkings.length}):` : 'We have not find anything :(' : 'You can find parking from our list:'}
          </Text>
          <ScrollView onRefresh={this.onRefresh}>
            {!parkings.length
              ? (
                <>
                  <Image source={Images.searchParking} style={styles.searchImage}></Image>
                  <Text style={styles.commentText}>
                    If you want to find a parking space - enter the name in the search field above
                  </Text>
                </>
              )
              : (
                <List
                  data={parkings}
                  renderItem={this.renderParkingItem}
                  onEndReached={this.onEndReached}
                />
              )}
          </ScrollView>
        </View>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={ 20 } contentContainerStyle={{ display: 'none' }}>
          <Button
            style={[styles.searchButton, !showSearchButton && { display: 'none' }]}
            onPress={this.handlePressSearch}
            >
            <Text>Search</Text>
          </Button>
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
		parkings: state.parkings
	};
}

const mapDispatchToProps = (dispatch) => {
  return {
		attemptSearch: (search, per_page, page) => dispatch(SearchParkingActions.fetchParkingLots(search, per_page, page)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingSearch)
