import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native'
import { Tab } from './Tab'
import { Text } from '../../Components'
import styles from '../Styles/TabsStyle'
import { Colors } from '../../Themes';
import Carousel from 'react-native-snap-carousel'

const extractPropsFromChildren = (children) => {
  return React.Children.map(children, (item) => {
    if (item.type === Tab) {
      return item.props
    }

    throw new Error("Only elements of type 'Tab' are allowed as children of 'Tabs' elements")
  })
}

export class Tabs extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: 0,
      sliderWidth: 0
    }
  }

  componentDidMount() {
    this.setSelectedIndex(this.props.selectedIndex)
  }

  setSelectedIndex = (index) => {
    this.setState({
      selectedIndex: index
    })
    this.props.onTabSelected(index)
  }

  onSnapToItem = (index) => {
    this.setState({
      selectedIndex: index
    })
    this.props.onTabSelected(index)
  }

  renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>{item}</View>
    )
  }
  onCarouselContainerLayout = ({ nativeEvent }) => {
    this.setCarouselWidth(nativeEvent.layout.width)
  }

  setCarouselWidth = (width) => {
    if (this.state.sliderWidth !== width) {
      this.setState({
        sliderWidth: width
      })
    }
  }

  render () {

    const { children } = this.props
    const { selectedIndex, sliderWidth } = this.state
    const tabsProps = extractPropsFromChildren(children)
    
    return (
      <View style={styles.container}>
        <View style={styles.tabsHeader}>
          {tabsProps.map((props, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tabHeader,
                index === selectedIndex && styles.primaryTabHeader
              ]}
              onPress={() => this.setSelectedIndex(index)}
            >
              <View style={[{width: '100%', alignItems: 'center'}, index !== 0 && styles.vSpace]}>
                <Text
                  text={props.title}
                  key={props.title}
                  type="regular"
                  color={index === selectedIndex ? Colors.primary.base : Colors.grey}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View onLayout={this.onCarouselContainerLayout} style={{ flex: 1, marginLeft: 30, marginRight: 30 }}>
          {sliderWidth !== 0 && (
            <Carousel
              firstItem={selectedIndex}
              sliderWidth={sliderWidth}
              itemWidth={sliderWidth}
              loop={false}
              windowSize={1}
              activeSlideOffset={5}
              shouldOptimizeUpdates={true}
              removeClippedSubviews={true}
              scrollEnabled={this.scrollEnabled}
              useScrollView={true}
              data={React.Children.toArray(children)}
              renderItem={this.renderItem}
              onSnapToItem={this.onSnapToItem}
            >
            </Carousel>
          )}
        </View>
      </View>
    )
  }
}
