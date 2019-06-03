import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  space: {
    flex: 1
  },
  confirmCodeContainer: {
    flexDirection: 'row'
  },
  successImage: {
    height: 158,
    width: 165,
    resizeMode: 'contain'
  }
})
