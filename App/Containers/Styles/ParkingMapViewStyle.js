import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { screenWidth, screenHeight, Platform } from '../../Lib/platfrom'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  header: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: 5,
    left: 10,
    right: 10,
    width: screenWidth - 20,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: '#3662A2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 1,
  },
  parkingSearchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.type.light,
    color: Colors.black.base,
    paddingRight: 20
  },
  parkingContainer: {
    position: 'absolute',
    bottom: 15,
    left: 10,
    width: screenWidth - 20,
    backgroundColor: '#fff',
    height: 115,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 20,
    shadowColor: '#3662A2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 1,
  },
  addressContainer: {
    flex: 1,
    marginRight: 20
  },
  routeBtn: {
    flex: 1,
    marginTop: 35,
    justifyContent: 'flex-end',
  },
  addressTextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationIcon: {
    width: 22,
    height: 22,
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
  currenLocationButton: {
    position: 'absolute',
    bottom: 200,
    right: 37,
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3662A2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 1,
  },
  locationButton: {
    position: 'absolute',
    bottom: 265,
    right: 37,
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3662A2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 1,
  },
  fullButton: {
    position: 'absolute',
    top: 80,
    right: 37,
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3662A2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 1,
  }
})
