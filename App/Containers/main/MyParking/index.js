import _ from 'lodash'
import React, { Component } from 'react'
import { BackHandler, View, Image, TouchableOpacity } from 'react-native'
import { Container } from 'native-base'
import { connect } from 'react-redux'
import { Header, Tabs, Tab, Text, SvgIcon, List } from '../../../Components'
import { Images, Colors } from '../../../Themes'
import { windowWidth } from '../../../Lib/platfrom'
import MyParkingAction from '../../../Redux/MyParking'
// Styles
import styles from '../../Styles/MyParkingStyle'

class MyParking extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabs: [
        { name: 'Current', value: 'current' },
        { name: 'History', value: 'history' }
      ],
      selectedIndex: 0
    }
  }

  componentDidUpdate(prevProps) {
    const { parkingFilters } = this.props;
    if (!_.isEqual(parkingFilters.filter, prevProps.parkingFilters.filter)) {
      this.props.fetchParkings(parkingFilters.filter)
    }
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
    this.props.fetchParkings(this.props.parkingFilters.filter)
  }

  onTabSelected = (index) => {
    this.setState({
      selectedIndex: index
    })
  }

  handleClickRight = (index) => {
    if (index === 0 && this.state.selectedIndex === 1) {
      this.props.navigation.navigate(
        "modals",
        {},
        {
          routeName: "ParkingTransactionsFilters",
          type: "Navigation/NAVIGATE",
        }
      )
    }
  }

  onRefresh = () => {
    this.props.fetchParkings(this.props.parkingFilters.filter)
  }

  renderMyParkingItem = ({ item }) => {
    return (
      <View style={styles.parkingItem}>
        <View style={styles.parkingLeft}>
          <Image source={Images.car} style={{
            width: 55,
            height: 96
          }}/>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5
          }}>
            <SvgIcon
              name="info"
              size={16}
            />
            <Text
              text={item.state}
              size={10}
              opacity={0.9}
              type="light"
            />
          </View>
          <Text
            text="Total: 2 hours parking"
            size={8}
            opacity={0.8}
            type="light"
          />
        </View>
        <View style={styles.parkingRight}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              text={item.plateNumber}
              color={Colors.black.base}
              size={15}
              opacity={0.9}
            />
            <Text
              text={item.paymentStatus}
              type="light"
              color={Colors.green}
              size={14}
            />
          </View>
          <Text
            text={item.date}
            size={12}
            type="light"
            marginTop={10}
          />
          <Text
            text={`${item.startTime} - ${item.endTime}`}
            size={12}
            type="light"
            marginTop={10}
          />
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <SvgIcon
              name="address"
              color={Colors.grey}
              size={16}
            />
            <Text
              text="Address"
              color={Colors.grey}
              size={14}
              type="light"
            />
          </View>
          <Text
            text={item.address}
            size={12}
            type="light"
            marginTop={10}
          />
          <View style={{ marginTop: 10, alignItems: 'flex-end' }}>
            <TouchableOpacity style={{ flexDirection: 'row' }}>
              <Text
                text="More details"
                color={Colors.primary.base}
                size={12}
                type="light"
              />
              <SvgIcon
                name="arrow_right"
                size={11}
                color={Colors.primary.base}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }


  render () {
    const { selectedIndex, tabs } = this.state
    const { myParkings } = this.props
    return (
      <Container>
        <Header
          text="My Parking"
          leftIcon="menu"
          rightIcons={selectedIndex === 0 ? ['notifications'] : ['filter', 'notifications']}
          onPressLeft={() => this.props.navigation.toggleDrawer()}
          onPressRight={(index) => this.handleClickRight(index)}
          navigation={this.props.navigation}
        />
        <Tabs selectedIndex={selectedIndex} onTabSelected={this.onTabSelected}>
          {tabs.map((config, index) => (
            <Tab
              onRefresh={this.onRefresh}
              key={index}
              title={config.name}
            >
              {myParkings[config.value] && myParkings[config.value].length
                ?
                  <List
                    data={myParkings[config.value]}
                    renderItem={this.renderMyParkingItem}
                  />
                :
                <View style={styles.emptyContianer}>
                  <Text
                   text="You haven't current parking for now"
                   size={16}
                   opacity={0.9}
                   type="regular"
                   marginTop={30}
                   marginBottom={40}
                  />
                  <Image source={index === 0 ? Images.currentParkingEmpty : Images.parkingHistoryEmpty} style={{
                    width: windowWidth - 50,
                    height: windowWidth - 100
                  }}/>
                  <Text
                    text='If you want to find a parking space - go to the "Search parking"'
                    size={14}
                    opacity={0.9}
                    type="regular"
                    marginTop={40}
                    textAlign="center"
                  />
                </View>
              }
            </Tab>
          ))}
        </Tabs>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    parkingFilters: state.parkingFilters,
    myParkings: state.myParkings.result
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchParkings: (filter) => dispatch(MyParkingAction.fetchMyParking(filter)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyParking)
