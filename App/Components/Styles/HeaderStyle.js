import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  container: {
    width: '100%',
    flexDirection: 'row',
    paddingRight: 16,
    paddingLeft: 36,
    shadowColor: '#4E7BA1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 1,
  },
  sideContainer: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    marginRight: 20
  },
  body: {
    flex: 1,
    justifyContent: 'center'
  },
  badgeContainer: {
    position: 'absolute', 
    right: 12, 
    top: 10, 
    paddingTop: 0, 
    paddingBottom: 0, 
    borderRadius: 100, 
    height: 20,
    width: 20, 
    backgroundColor: '#FFD428'
  },
  badgeText :{
    height: 20,  
    width: 20, 
    left: -7
  }
})
