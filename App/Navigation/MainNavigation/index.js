import { Colors } from '../../Themes'
import { createStackNavigator, TransitionConfig } from 'react-navigation'
import { Animated, Easing } from 'react-native'
import { DrawerNavigator } from './DrawerNavigator'
import { ModalNavigator } from './ModalNavigator'

const FadeTransition = (index, position) => {
  const sceneRange = [index - 1, index]
  const outputOpacity = [0.2, 1]
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputOpacity
  })

  return {
    opacity: transition
  }
}

const NavigationConfig = () => ({
  screenInterpolator: ({ position, index }) => FadeTransition(index, position),
  transitionSpec: {
    duration: 50,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true
  }
})

export const MainNavigator = createStackNavigator(
  {
    drawer: {
      screen: DrawerNavigator
    },
    modals: ModalNavigator
  },
  {
    initialRouteKey: "drawer",
    headerMode: "none",
    cardStyle: {
      shadowColor: "transparent",
      backgroundColor: Colors.white.base
    },
    transitionConfig: NavigationConfig
  }
)