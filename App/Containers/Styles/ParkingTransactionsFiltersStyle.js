import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingLeft: 30,
    paddingRight: 30,
    borderBottomWidth: 1,
    borderColor: '#EFEFF4',
    borderStyle: 'solid',
  },
  sectionContent: {
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderColor: '#EFEFF4',
    borderStyle: 'solid',
  },
  buttonContainer: {
    padding: 30
  }
})
