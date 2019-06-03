import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes';
export default StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeContainer: {
    shadowColor: '#3A9CED',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.21,
    shadowRadius: 9,
    elevation: 1,
  }
})
