// @flow

import { Platform, Dimensions } from "react-native";
import { Platform as Platforms } from "../../App/Lib/platfrom"

import variable from "./../variables/platform";

const deviceHeight = Dimensions.get("window").height;
export default (variables /*: * */ = variable) => {
  const theme = {
    flex: 1,
    backgroundColor: variables.containerBgColor
  };

  return theme;
};
