import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes';
export default StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    width: '100%',
    height: 170,
    // backgroundColor: Colors.black.brighter,
    justifyContent: 'flex-start',
    paddingTop: 36,
    paddingLeft: 36,
    paddingRight: 20
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#848484'
  },
  avatarContainer: {
    flexDirection: "row",
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  userProfile: {
    flex: 1
  },
  menu: {
    paddingTop: 15,
    paddingBottom: 15
  },
  menuItem: {
    flexDirection: "row",
    alignItems: 'center',
    paddingLeft: 30,
    paddingTop: 15,
    paddingBottom: 15
  },
  logOut: {
    fontSize: 15,
    fontFamily: Fonts.type.light,
    color: Colors.grey,
  }
})
