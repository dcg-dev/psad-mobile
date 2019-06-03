import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes'
import { Platform, windowWidth } from '../../Lib/platfrom';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  space: {
    flex: 1
  }
})
