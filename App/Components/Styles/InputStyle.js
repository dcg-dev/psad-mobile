import { StyleSheet } from 'react-native';
import { Images, Metrics, Fonts, Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderColor: Colors.primary.base,
    borderStyle: 'solid',
  },
  errorContainer: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderStyle: 'solid',
  },
  labelContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    position: 'absolute',
    left: Metrics.space.small,
    backgroundColor: Colors.white.base,
  },
  label: {
    fontFamily: Fonts.type.light,
    color: Colors.black.base,
    fontSize: Fonts.size.medium
  },
  input: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.medium,
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
  }
})
