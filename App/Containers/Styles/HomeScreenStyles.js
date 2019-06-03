import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes'
import { Dimensions, Platform as ReactNativePlatform } from 'react-native'
export const width = Dimensions.get("window").width

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    marginTop: Metrics.doubleSection,
    height: width - Metrics.space.medium * 3,
    width: width - Metrics.space.medium * 2,
    resizeMode: 'contain'
  }
})
