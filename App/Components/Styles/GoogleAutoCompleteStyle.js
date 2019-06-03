import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes'

export default StyleSheet.create({
  errorText: {
    marginTop: 5,
    height: 15,
    marginLeft: Metrics.space.tiny,
    color: Colors.secondary,
    fontSize: Fonts.size.small
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: 46,
    shadowColor: '#3662A2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    borderRadius: Metrics.inputBorder,
    paddingLeft: Metrics.space.small,
    paddingRight: Metrics.space.small,
    backgroundColor: Colors.white.base
  },
  focusedContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.primary.base
  },
  errorContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.secondary
  },
  labelContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    position: 'absolute',
    left: Metrics.space.small,
    backgroundColor: Colors.white.base,
  },
  label: {
    color: Colors.black.base,
    fontSize: Fonts.size.medium
  },
  errorText: {
    marginTop: 5,
    height: 15,
    marginLeft: Metrics.space.tiny,
    color: Colors.secondary,
    fontSize: Fonts.size.small
  },
  icon: {
    color: Colors.black.base,
    fontSize: 25
  },
  iconError: {
    color: Colors.secondary,
    fontSize: 25
  },
  textInputContainer: {
    marginTop: Metrics.smallMargin,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    height: 46,
    borderWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    fontSize: 14,
    fontFamily: Fonts.type.light,
    color: Colors.black.base,
    borderRadius: Metrics.inputBorder,
    backgroundColor: 'white',
    paddingLeft: Metrics.space.small + 5,
    paddingRight: Metrics.space.small
  },
  input: {
    fontSize: 14,
    fontFamily: Fonts.type.light,
    color: Colors.black.base
  },
  textInput: {
    width: '100%',
    height: 46,
    borderWidth: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 14
  }
})
