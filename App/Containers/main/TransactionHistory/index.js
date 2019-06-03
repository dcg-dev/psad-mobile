import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import { Container, Content, Text } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Header} from '../../../Components'
// Styles
import styles from '../../Styles/TransactionHistoryStyle'

class TransactionHistory extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  render () {
    return (
      <Container>
        <Header
          text="Transaction History"
          leftIcon="menu"
          rightIcons={['filter', 'notifications']}
          onPressLeft={() => this.props.navigation.toggleDrawer()}
          navigation={this.props.navigation}
        />
        <Content></Content>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory)
