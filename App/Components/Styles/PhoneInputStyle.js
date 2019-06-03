import { StyleSheet } from 'react-native';
import { Images, Metrics, Fonts, Colors } from '../../Themes';
import { windowWidth } from '../../Lib/platfrom';

export default StyleSheet.create({
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
    paddingRight: Metrics.space.small,
    backgroundColor: Colors.white.base
  },
  focusedContainer: {
    borderWidth: 1,
    borderColor: Colors.primary.base,
    borderStyle: 'solid'
  },
  errorContainer: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderStyle: 'solid'
  },
  errorText: {
    marginTop: 5,
    height: 15,
    marginLeft: Metrics.space.tiny,
    color: Colors.secondary,
    fontSize: Fonts.size.small
  },
  input: {
    marginTop: 1,
    fontSize: 14,
    fontFamily: Fonts.type.light,
    color: Colors.black.base
  },
  icon: {
    color: Colors.black.base,
    fontSize: 25
  },
  iconError: {
    color: Colors.secondary,
    fontSize: 25
  },
  flagContainer: {
    flexDirection: 'row',
    borderRightWidth: 1,
    borderColor: 'rgba(239,239,244, 0.66)',
    borderStyle: 'solid',
    height: '100%',
    width: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flag: {
    width: 23.5,
    height: 15.4,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin
  },
  prefix: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: Fonts.type.light,
    color: Colors.black.base
  },
  pickerContainer: {
    backgroundColor: Colors.white.base,
    borderRadius: 8,
    elevation: 10,
    paddingTop: 10,
    paddingBottom: 10,
    maxHeight: 400,
    minHeight: 300,
  },
  modalItem: {
    flexDirection: 'row',
    height: 40
  }
})
