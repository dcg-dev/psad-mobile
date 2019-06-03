import { Colors } from '../../Themes'
import { HomeNavigator } from './HomeNavigator'
import Menu from '../../Components/Menu'
import { createDrawerNavigator } from 'react-navigation'

export const DrawerNavigator = createDrawerNavigator(
  {
    home: {
      screen: HomeNavigator
    }
  },
  {
    drawerWidth: 280,
    drawerBackgroundColor: Colors.white.base,
    contentComponent: Menu
  }
)