import React, { Component } from 'react'
import { BackHandler, View, TouchableOpacity, Animated } from 'react-native'
import { Content, Container } from 'native-base'
import { Header, CheckBox, SvgIcon, Text, Button } from '../../../../Components'
import styles from '../../../Styles/NotificationsStyle'
import { Colors } from '../../../../Themes'
import * as Animatable from "react-native-animatable"

class NotificationFilters extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
          filterSections: {
            actions: {
              name: 'ACTIONS',
              expanded: false,
              items: [
                { name: 'Car successfully parked', value: false },
                { name: 'Car violations', value: false },
                { name: 'Car exit', value: false },
                { name: 'Car entry', value: false },
              ]
            },
            vehicles: {
              name: 'VEHICLES',
              expanded: false,
              items: [
                { name: 'TT 3587', value: false },
                { name: 'TR 1156', value: false }
              ]
            }
          }
        }
    }

    goToBack = () => {
        this.props.navigation.navigate('NotificationsScreen')
    }

    toggleSection = (name) => {
        const { filterSections } = this.state
        const data = filterSections[name] || {}
        data.expanded = !data.expanded
        this.setState({ filterSections })
    }
    
    handleChangeFilter = (name, index) => {
        const { filterSections } = this.state;
        const data = this.state.filterSections[name];
        data.items[index].value = !data.items[index].value;
        this.setState({ filterSections })
    }

    componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', () => {
          this.props.navigation.goBack();
          return true
        })
    }

    render () {
        const { filterSections } = this.state
        return (
            <Container>
                <Header
                    text="Notifications Filter"
                    leftIcon="back_arrow"
                    rightIcons={['notifications']}
                    onPressLeft={this.goToBack}
                    onPressRight={(index) => this.hanldleClickFilter(index)}
                    navigation={this.props.navigation}
                />
                <Content>
                    <View>
                        <TouchableOpacity style={styles.sectionHeader} onPress={() => this.toggleSection('actions')}>
                            <Text
                                text={`${filterSections.actions.name} (${filterSections.actions.items.filter(item => item.value).length})`}
                                size={15}
                                type="medium"
                                opacity={0.9}
                            />
                            <SvgIcon
                                name={filterSections.actions.expanded ? 'arrow_up' : 'arrow_down'}
                                color={filterSections.actions.expanded ? Colors.primary.base : Colors.grey}
                                size={24}
                            />
                        </TouchableOpacity>
                        {
                            filterSections.actions.expanded &&
                            <Animatable.View style={styles.sectionContent} animation="fadeIn">
                                {
                                    filterSections.actions.items.map((item, index) => (
                                        <CheckBox
                                            key={item.name}
                                            text={item.name}
                                            value={item.value}
                                            onPress={() => this.handleChangeFilter('actions', index)}
                                        />
                                    ))
                                }
                            </Animatable.View>
                        }
                    </View>
                    <View>
                        <TouchableOpacity style={styles.sectionHeader} onPress={() => this.toggleSection('vehicles')}>
                            <Text
                                text={`${filterSections.vehicles.name} (${filterSections.vehicles.items.filter(item => item.value).length})`}
                                size={15}
                                type="medium"
                                opacity={0.9}
                            />
                            <SvgIcon
                                name={filterSections.vehicles.expanded ? 'arrow_up' : 'arrow_down'}
                                color={filterSections.vehicles.expanded ? Colors.primary.base : Colors.grey}
                                size={24}
                            />
                        </TouchableOpacity>
                        {
                            filterSections.vehicles.expanded &&
                            <Animatable.View style={styles.sectionContent} animation="fadeIn">
                                {
                                    filterSections.vehicles.items.map((item, index) => (
                                        <CheckBox
                                            key={item.name}
                                            text={item.name}
                                            value={item.value}
                                            onPress={() => this.handleChangeFilter('vehicles', index)}
                                        />
                                    ))
                                }
                            </Animatable.View>
                        }
                    </View>
                </Content>
                <View style={styles.buttonContainer}>
                    <Button
                        name="APPLY FILTERS"
                        onPress={this.goToBack}
                    />
                </View>
            </Container>
        )
    }
}

export default NotificationFilters