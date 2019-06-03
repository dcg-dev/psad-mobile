import React, { Component } from 'react'
import { BackHandler, View, TouchableOpacity, Animated } from 'react-native'
import { Content, Container } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ParkingFiltersActions from '../../../../Redux/ParkingFilter';
import { Header, CheckBox, SvgIcon, Text, Button } from '../../../../Components'
import * as Animatable from "react-native-animatable"
// Styles
import styles from '../../../Styles/ParkingTransactionsFiltersStyle'
import { Colors } from '../../../../Themes';

class ParkingTransactionsFilters extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filterSections: {
        plateNumber: {
          name: 'LICENSE PLATE NUMBER',
          expanded: false,
          filters: ['TE1-12', 'TR 4687', 'NC 7974', 'NT 8879']
        },
        date: {
          name: 'MONTH/YEAR',
          expanded: false,
          filters: ['2018/10', '2018/11', '2018/12', '2019/01', '2019/02']
        },
        parkingLot: {
          name: 'PARKING LOT',
          expanded: false,
          filters: ['XERONK', 'PLASMOX', 'MOREGANIC']
        }
      },
      parkingFilters: {
        plateNumber: [],
        date: [],
        parkingLot: []
      }
    }
  }
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
    this.setState({
      parkingFilters: this.props.parkingFilters
    })
  }

  goToBack = () => {
    this.props.navigation.navigate('MyParkingScreen')
  }

  toggleSection = (name) => {
    const { filterSections } = this.state
    const data = filterSections[name] || {}

    data.expanded = !data.expanded

    this.setState({
      filterSections
    })
  }

  updateFilters = () => {
    this.props.updateFilters(this.state.parkingFilters)
    this.goToBack()
  }

  handleChangeFilter = (name, item) => {
    const parkingFilters = Object.assign({}, this.state.parkingFilters)

    const filter = Object.assign([], parkingFilters[name])

    const filterIndex = filter.indexOf(item)
    if (filterIndex > -1) {
      filter.splice(filterIndex, 1)
    } else {
      filter.push(item)
    }
    parkingFilters[name] = filter
    
    this.setState({
      parkingFilters
    })
  }

  render () {

    const { filterSections, parkingFilters } = this.state
    return (
      <Container>
        <Header
          text="Parking History Filter"
          leftIcon="back_arrow"
          onPressLeft={this.goToBack}
          rightIcons={['notifications']}
          navigation={this.props.navigation}
        />
        <Content>
          {Object.keys(filterSections).map((key, index) => (
            <View key={key}>
              <TouchableOpacity style={styles.sectionHeader} onPress={() => this.toggleSection(key)}>
                <Text
                  text={`${filterSections[key].name}`}
                  size={15}
                  type="medium"
                  opacity={0.9}
                />
                <SvgIcon
                  name={filterSections[key].expanded ? 'arrow_up' : 'arrow_down'}
                  color={filterSections[key].expanded ? Colors.primary.base : Colors.grey}
                  size={24}
                />
              </TouchableOpacity>
              {filterSections[key].expanded &&
                <Animatable.View style={styles.sectionContent} animation="fadeIn">
                  {filterSections[key].filters.map((item, index) => (
                    <CheckBox
                      key={item}
                      text={item}
                      value={parkingFilters[key] && parkingFilters[key].includes(item)}
                      onPress={() => this.handleChangeFilter(key, item)}
                    />
                  ))}
                </Animatable.View>
              }
            </View>
          ))}
        </Content>
        <View style={styles.buttonContainer}>
          <Button
            name="APPLY FILTERS"
            onPress={this.updateFilters}
          />
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    parkingFilters: state.parkingFilters.filter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilters: (data) => dispatch(ParkingFiltersActions.updateFilters(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingTransactionsFilters)
