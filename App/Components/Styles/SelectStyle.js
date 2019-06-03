import { StyleSheet } from 'react-native';
import { Images, Metrics, Fonts, Colors } from '../../Themes';
import { Platform, windowWidth } from '../../Lib/platfrom';

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
    paddingLeft: Metrics.space.small,
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
  errorText: {
    marginTop: 5,
    height: 15,
    marginLeft: Metrics.space.tiny,
    color: Colors.secondary,
    fontSize: Fonts.size.small
  },
  label: {
    color: Colors.black.base,
    fontSize: Fonts.size.medium
  },
  input: {
    marginTop: 1
  },
  icon: {
    color: Colors.black.base,
    fontSize: 25
  },
  selectContainer: {
    flexDirection: 'row',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  prefix: {
    marginLeft: 10
  },
  pickerContainer: {
    backgroundColor: Colors.white.base,
    borderRadius: Platform.isIos ? 10 : 0,
    elevation: 10,
    paddingTop: 10,
    paddingBottom: 10,
    maxHeight: 400,
    minHeight: 300,
  },
  modalItem: {
    flexDirection: 'row',
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  }
})
