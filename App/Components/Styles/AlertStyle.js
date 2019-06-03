import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes';
import { Platform, windowWidth } from '../../Lib/platfrom';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  modalContainer: {
    padding: 35,
    backgroundColor: Colors.white.base,
    borderRadius: Platform.isIos ? 10 : 0,
    elevation: 10,
    alignItems: 'center',
    shadowColor: '#3662A2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 1,
  },
  logo: {
    marginTop: 20,
    height: 138,
    width: 145,
    resizeMode: 'contain'
  }
})
