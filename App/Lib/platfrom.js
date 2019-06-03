import { Dimensions, Platform as ReactNativePlatform } from 'react-native'

export class Platform {
  static isIos = ReactNativePlatform.OS === "ios"

  static isAndroid = ReactNativePlatform.OS === "android"

  static isIphoneX =
    ReactNativePlatform.OS === "ios" &&
    (Dimensions.get("window").height === 812 || Dimensions.get("window").width === 812)
}

export const screenWidth = Dimensions.get("screen").width
export const screenHeight = Platform.isIphoneX ? Dimensions.get("screen").height - 79 : Dimensions.get("screen").height
export const windowWidth = Dimensions.get("window").width
export const windowHeight = Dimensions.get("window").height
