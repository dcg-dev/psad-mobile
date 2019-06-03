import React, { Component } from 'react'
import { ScrollView } from '../../Components'
import styles from '../Styles/TabsStyle'

export class Tab extends Component {

  onRefresh = () => {
    
  }

  render () {
    const { children, onRefresh, rest } = this.props
    return (
      <ScrollView style={styles.tabContainer} onRefresh={onRefresh} {...rest} >
        {children}
      </ScrollView>
    )
  }
}
