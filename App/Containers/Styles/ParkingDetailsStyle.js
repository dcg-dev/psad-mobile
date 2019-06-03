import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    marginTop: 95,
    marginLeft: 52,
    marginRight: 52
  },
  locationIcon: {
    width: 22,
    height: 22,
  },
  addressTextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  greyText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.light,
    color: Colors.grey
  },
  blackText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.light,
    color: Colors.black.base
  },
  addressContainer: {
    marginTop: Metrics.space.tiny
  },
  rateText: {
    marginTop: 5,
    marginLeft: 5
  }, 
  hourlyContainer: {
    marginTop: Metrics.space.small,
    flexDirection: 'row',
    alignItems: 'center'
  },
  mapButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  parkingContainer: {
    position: 'absolute',
    top: -155,
    width: '100%',
    backgroundColor: '#fff',
    height: 115,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 25,
    alignItems: 'center',
    shadowColor: '#3662A2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 1,
  },
  parkingState: {
    width: 98,
    height: 98,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  },
  parkingStateText: {
    color: Colors.white.base,
    fontFamily: Fonts.type.regular,
    fontSize: 26
  },

  parkingDetails: {
    height: 70,
    justifyContent: 'space-around'
  },

  occupiedText: {
    fontSize: 14,
    fontFamily: Fonts.type.medium,
    color: Colors.secondary
  },
  emptyText: {
    fontSize: 14,
    fontFamily: Fonts.type.medium,
    color: Colors.green
  },
  totalText: {
    fontSize: 14,
    fontFamily: Fonts.type.medium,
    color: Colors.black.base
  }  

})
