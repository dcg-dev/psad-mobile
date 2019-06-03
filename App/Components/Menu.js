import React, { Component } from 'react';
import { View } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native';
import styles from './Styles/MenuStyle';
import { connect } from 'react-redux';

import { Fonts, Colors } from '../Themes';
import LinearGradient from 'react-native-linear-gradient';
import { SvgIcon, Text } from '../Components';
import LoginActions from '../Redux/LoginRedux';
import NavigationActions from '../Redux/NavigationRedux';

class Menu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menuList: [
        { name: 'Search parking', screen: 'SearchParkingScreen' },
        { name: 'My parking', screen: 'MyParkingScreen' },
        { name: 'Messages', screen: 'MessagesScreen' },
        { name: 'Transaction history', screen: 'TransactionHistoryScreen' },
        { name: 'Settings', screen: 'SettingsScreen' },
        { name: 'QR scan', screen: 'QRScanScreen' }
      ]
    }
  }

  logout = () => {
    this.props.attemptLogout()
    this.props.navigation.navigate("LoginScreen")
  }

  handleScreen = (name) => {
    this.props.updateNavigation(name)
    this.props.navigation.navigate(name)
  }

  isActive(name) {
    if (this.props.nav.currentNav === name) {
      return true
    }
    return false
  }

  render () {
    const { menuList } = this.state
    const { user } = this.props
    return (
      <View style={styles.container}>
        <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 1}} colors={[Colors.primary.base, '#a4cdf8']} style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            <View style={styles.userAvatar}></View>
            <SvgIcon
              name="back_arrow"
              color={Colors.white.base}
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          </View>
          <View style={styles.userProfile}>
            <Text
              text={user ? `${user.first_name} ${user.last_name}` : ''}
              size={16}
              type="regular"
              color={Colors.white.base}
              marginTop={15}
            />
            <Text
              text="Profile details"
              size={13}
              type="light"
              color={Colors.white.base}
              marginTop={10}
            />
          </View>
        </LinearGradient>
        <ScrollView style={styles.menu}>
          {menuList.map(menuItem => (
            <TouchableOpacity key={menuItem.name} style={styles.menuItem} onPress={() => this.handleScreen(menuItem.screen)} >
              <Text
                text={menuItem.name}
                color={this.isActive(menuItem.screen) ? Colors.primary.base : Colors.black.base}
                size={15}
                type={this.isActive(menuItem.screen) ? "medium" : "light"}
                opacity={this.isActive(menuItem.screen) ? 1 : 0.9}
              />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.menuItem} onPress={this.logout}>
            <Text
              text="Log out"
              size={15}
              type="light"
              color={Colors.grey}
            />
            <SvgIcon
              name="log_out"
              marginLeft={5}
              color={Colors.grey}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
	return {
    login: state.login,
    nav: state.nav,
    user: state.user.me
	};
};

const mapDispatchToProps = dispatch => {
	return {
    attemptLogout: () => dispatch(LoginActions.logout()),
    updateNavigation: (name) => dispatch(NavigationActions.updateNavRequest(name))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
