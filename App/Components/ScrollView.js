import React, { Component } from 'react'
import { ScrollView as NativeScrollView, RefreshControl, View } from 'react-native'
import styles from './Styles/ScrollViewStyle'

export class ScrollView extends Component {

  render () {

    const { children, onRefresh, style, ...rest } = this.props

    return (
      <NativeScrollView
        refreshControl={
          onRefresh ? (
            <RefreshControl
              progressViewOffset={200}
              onRefresh={onRefresh}
              refreshing={false}
            />
          ) : null
        }
        style={[style, { width: '100%'}]}
        {...rest}
      >
        <View>
          {children}
        </View>
      </NativeScrollView>
    )
  }
}
