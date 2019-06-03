import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    marginTop: 95,
    marginLeft: 52,
    marginRight: 52
  },
  section: {
    flex: 1, 
    height: 70, 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    paddingVertical: 10, 
    borderColor: Colors.border, 
    marginTop: 1
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
    paddingTop: 10
  },
  buttonContainer: {
    padding: 30
  }
})
