import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from "react-native"

const ListItemSeparator = () => null

const listKeyExtractor = (keyProperty) => (item) => item[keyProperty]

export class List extends Component {
  // Prop type warnings
  static propTypes = {
    keyProperty: PropTypes.string,
    onLoadMore: PropTypes.func
  }

  renderItem = (data) => {
    return (
      <>
        {this.props.renderItem(data)}
      </>      
    )
  }

  render () {
    const {
      keyExtractor,
      keyProperty = "id",
      ItemSeparatorComponent,
      data = [],
      onLoadMore,
      onEndReached
    } = this.props
    return (
      <FlatList
        style={{ alignSelf: "stretch" }}
        ItemSeparatorComponent={ItemSeparatorComponent || ListItemSeparator}
        keyExtractor={keyExtractor || listKeyExtractor(keyProperty)}
        data={data.slice()}
        renderItem={this.renderItem}
        onEndReached={onLoadMore || onEndReached}
        onEndReachedThreshold={0}
      />
    )
  }
}
