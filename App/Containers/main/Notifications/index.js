import React, { Component } from 'react'
import { BackHandler, Image, TouchableOpacity } from 'react-native'
import { Content, Container, View } from 'native-base'
import { connect } from 'react-redux'
import { Text } from '../../../Components'
import { Header } from '../../../Components'
import { FlatList } from 'react-native-gesture-handler'
import styles from '../../Styles/NotificationsStyle'
import { Colors, Images } from '../../../Themes'
import _ from 'lodash'

class NotificationItem extends Component {
    render() {
        const { notification } = this.props;
        return  (
            <View style={[styles.section, { backgroundColor: notification.isNew == true ? '#F1F2F7' : Colors.white.base }]}>
                <View style={{flex: 3, justifyContent: 'space-around', marginLeft: 30}}>
                    <Text
                        text={notification.date}
                        size={17}
                        opacity={0.9}
                        type="regular"
                        color={Colors.black.base}
                    />
                    <Text
                        text={notification.time}
                        size={15}
                        opacity={0.9}
                        type="light"
                        color={Colors.black.medium}
                    />
                </View>
                <View style={{flex: 7, justifyContent: 'space-around'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        { notification.isNew && <Image source={Images.point} style={{marginRight: 10}}/> }
                        <Text
                            text={notification.type}
                            size={17}
                            opacity={0.9}
                            color={Colors.black.base}
                        />
                    </View>
                    <Text
                        text={notification.detail}
                        size={15}
                        opacity={0.9}
                        type="light"
                        color={Colors.black.medium}
                    />
                </View>
            </View>
        )
    }
}

class Notifications extends Component {
    constructor (props) {
        super(props)
        this.state = {
            notifications: [
                { id: 1, type: 'Car successfully parked', detail:'Details', date: '20/09/18', time: '8.05am', isNew: true },
                { id: 2, type: 'Car violation', detail:'Details', date: '07/09/18', time: '8.05am', isNew: true },
                { id: 3, type: 'Car exit', detail:'Details', date: '20/09/18', time: '8.05am', isNew: false },
                { id: 4, type: 'Car entry', detail:'Details', date: '07/09/18', time: '8.05am', isNew: false },
                { id: 5, type: 'Car violation', detail:'Details', date: '20/09/18', time: '8.05am', isNew: false },
                { id: 6, type: 'Car violation', detail:'Details', date: '07/09/18', time: '8.05am', isNew: false },
                { id: 7, type: 'Car successfully parked', detail:'Details', date: '20/09/18', time: '8.05am', isNew: false },
                { id: 8, type: 'Car entry', detail:'Details', date: '07/09/18', time: '8.05am', isNew: false }
            ]      
        }
    }

    componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', () => {
          this.props.navigation.goBack();
          return true
        })
    }

    hanldleClickFilter = (index) => {
        if (index === 0) {
            this.props.navigation.push(
              "modals",
              {},
              {
                routeName: "NotificationFilters",
                type: "Navigation/NAVIGATE",
              }
            )
        }
    }

    handleNotification = (notificationID) => {
        const { notifications } = this.state;
        let index = _.findIndex(notifications, {id : notificationID});
        notifications[index].isNew = false;
        this.setState({ notifications });
    }

    renderNotifications = ({item}) => {
        return <TouchableOpacity onPress={() => this.handleNotification(item.id)} activeOpacity={0.1}>
                    <NotificationItem notification={item}/>
                </TouchableOpacity>
    }

    _renderItem = (item) => item.id.toString()

    goToBack = () => {
        const { routeName, params } = this.props.navigation.state.params;
        this.props.navigation.navigate(routeName, params);
    }

    render() {
        return (
            <Container>
                <Header
                    text="Notifications"
                    leftIcon="back_arrow"
                    rightIcons={['filter']}
                    onPressLeft={this.goToBack}
                    onPressRight={(index) => this.hanldleClickFilter(index)}
                />
                <Content>
                    <FlatList
                        data={this.state.notifications}
                        keyExtractor={this._renderItem}
                        renderItem={this.renderNotifications}
                    />
                </Content>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
  