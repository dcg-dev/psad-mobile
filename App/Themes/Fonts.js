import { Colors } from '../Themes'
const type = {
  regular: 'SFUIDisplay-Regular',
  medium: 'SFUIDisplay-Medium',
  light: 'SFUIDisplay-Light'
}

const size = {
  big: 30,
  larger: 22,
  large: 16,
  medium: 14,
  small: 10,
  tiny: 8.5
}

const style = {
  h1: {
    color: Colors.primary.base,
    fontFamily: type.medium,
    fontSize: size.big
  },
  h2: {
    color: Colors.white.base,
    fontFamily: type.light,
    fontSize: size.large,
  },
  h3: {
    color: Colors.white.base,
    fontFamily: type.regular,
    fontSize: size.medium,
  },
  text1: {
    color: Colors.black.base,
    fontFamily: type.regular,
    fontSize: size.large,
    opacity: 0.9,
  },
  text2: {
    color: Colors.black.base,
    fontFamily: type.regular,
    fontSize: size.medium,
    opacity: 0.9
  },
  text3: {
    color: Colors.black.lighter,
    fontFamily: type.light,
    fontSize: size.medium,
    opacity: 1
  },
  text4: {
    color: Colors.black.base,
    fontFamily: type.light,
    fontSize: size.medium,
    opacity: 1
  },
  error: {
    color: Colors.secondary,
    fontFamily: type.regular,
    fontSize: size.small
  },
  normal: {
    fontFamily: type.regular,
    fontSize: size.medium
  },
  black: {
    color: Colors.black.base,
    fontFamily: type.regular,
    fontSize: size.medium,
    opacity: 0.9
  },
  white: {
    color: Colors.white.base,
    fontFamily: type.regular,
    fontSize: size.medium,
    opacity: 1
  },
  blackLight: {
    color: Colors.black.bright,
    fontFamily: type.regular,
    fontSize: size.medium,
    opacity: 0.6
  }
}

export default {
  type,
  size,
  style
}
