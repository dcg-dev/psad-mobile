import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'
import { Platform, windowWidth, screenHeight } from '../../Lib/platfrom';

const ratio = windowWidth/900;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
    backgroundColor: Colors.white.base,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    marginBottom: Platform.isIos ? 20 : 0,
    width: windowWidth,
    height: 1509 * ratio,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary.base
  }
})
