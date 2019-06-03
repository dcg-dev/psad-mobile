import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  emptyContianer: {
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  parkingItem: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: Colors.white.base,
    shadowColor: '#3662A2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 1,
    borderRadius: 8
  },
  parkingLeft: {
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center'
  },
  parkingRight: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#EFEFF4',
    borderStyle: 'solid'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
