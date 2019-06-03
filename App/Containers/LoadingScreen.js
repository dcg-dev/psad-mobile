import React, { Component } from 'react'
import { BackHandler, View } from 'react-native'
import { connect } from 'react-redux'
import { Spinner } from 'native-base'
import { retrieveToken } from '../Services/AsyncStorage';
import { Colors } from '../Themes'

// Styles
import styles from './Styles/LoadingScreenStyle'

class LoadingScreen extends Component {

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
    this.loadStorage();
  }

  loadStorage = async () => {
    setTimeout(async() => {
      try {
        const token = await retrieveToken();
        this.props.navigation.navigate(token ? "main" : "auth")
      } catch (error) {
        this.props.navigation.navigate("auth")
        console.log(error);
      }
    }, 500)
  }

  render () {
    return (
      <View style={styles.container}>
          <Spinner color={Colors.primary.base} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen)
