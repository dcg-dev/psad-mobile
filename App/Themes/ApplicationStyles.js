import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

import { Platform } from '../Lib/platfrom'
// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    content: {
      paddingLeft: Metrics.space.medium,
      paddingRight: Metrics.space.medium,
      flex: 1
    },
    center: {
      width : '100%',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center'
    },
    row: {
      flexDirection: 'row'
    },
    spaceLarge: {
      marginTop: Metrics.space.medium,
      width: '100%',
      alignItems: 'center'
    }
  }
}

export default ApplicationStyles
