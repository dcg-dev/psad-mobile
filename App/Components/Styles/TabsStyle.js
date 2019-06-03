import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  tabsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.white.base,
    shadowColor: '#4E7BA1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 1,
  },
  tabHeader: {
    flex: 1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: Colors.white.base,
    paddingTop: 10,
    paddingBottom: 10
  },
  primaryTabHeader: {
    borderBottomColor: Colors.primary.base
  },
  vSpace: {
    borderColor: Colors.grey,
    borderLeftWidth: 1,
    borderStyle: 'solid'
  },
  tabContainer: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10
  }
})
