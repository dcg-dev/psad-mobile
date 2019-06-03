import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 35,
    marginRight:35
  },
  header: {
    width: '100%',
    color: Colors.primary.base,
    fontFamily: Fonts.type.medium,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 30
  },
  searchResultText: {
    ...Fonts.style.text1,
    width: '100%',
    textAlign: 'center',
    marginBottom: 10
  },
  searchImage: {
    marginTop: 20,
    width: '90%',
  },
  searchButton: {
    borderRadius: 0,
    height: 50
  },
  parkings: {
    marginTop: 20
  },
  commentText: {
    ...Fonts.style.blackLight,
    textAlign: 'center', 
    paddingHorizontal: 10, 
    marginTop: 15, 
    lineHeight: 25
  },
  parkingItem: {
    flex: 1,
    height: 160,
    borderRadius: 4,
    shadowColor: '#3662A2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: Colors.white.base
  },
  parkingTop: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center'
  },
  parkingState: {
    width: 67,
    height: 67,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  },
  parkingStateText: {
    color: Colors.white.base,
    fontFamily: Fonts.type.regular,
    fontSize: 20
  },
  parkingInfo: {
    flex: 1,
    justifyContent: 'center'
  },

  parkingInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  infoBlackText: {
    color: Colors.black.base,
    fontSize: 15,
    fontFamily: Fonts.type.medium,
    opacity: 0.9
  },

  infoGreyText: {
    color: '#BEC2CE',
    fontSize: 13,
    fontFamily: Fonts.type.light,
  },

  parkingBottom: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#EFEFF4',
    borderStyle: 'solid',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center'
  },

  parkingAddressTitle: {
    flexDirection: 'row'
  },

  locationIcon: {
    width: 16,
    height: 16,
  },
  locationText: {
    marginTop: 10,
    fontSize: 13,
    fontFamily: Fonts.type.regular,
    color: Colors.black.base,
    opacity: 0.9
  }
})
