import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  space: {
    flex: 1
  },
  spacer: {
    width: '100%',
    height: 2,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: Colors.border,
    marginTop: 30,
    marginBottom: 20
  }
})
