import React, { Component } from 'react'
import Checkbox from '../checkbox'
import { DragSource, DropTarget } from 'react-dnd'
import classNames from 'classnames'
class Item extends Component {
  render () {
    const {
      mode,
      item,
      onClick,
      checkboxOnChange,
      checked,
      isDragging,
      connectDragSource,
      connectDropTarget,
      targetNode,
      sourceNode,
      dir,
      draggable
    } = this.props
    const sourceStyle =
      sourceNode === item.id && isDragging
        ? {
          background: 'rgba(246,246,246,1)',
          color: 'rgba(204,204,204,1)'
        }
        : {}
    const itemCls = classNames(
      'hi-transfer__item',
      item.disabled && 'hi-transfer__item--disabled'
    )
    const el = (
      <li style={sourceStyle} className={itemCls} onClick={onClick.bind(this)}>
        {targetNode === item.id && isDragging && <div className='hi-transfer__underline' />}
        {mode !== 'basic' ? (
          <Checkbox
            text={item.content}
            value={item.id}
            checked={checked}
            disabled={item.disabled}
            onChange={checkboxOnChange.bind(this)}
          />
        ) : (
          item.content
        )}
      </li>
    )
    return (dir === 'right' && draggable) ? connectDropTarget(connectDragSource(el)) : el
  }
}

const TYPE = 'CARD'
const source = {
  beginDrag (props) {
    props.setSourceNode(props.item.id)
    return {
      sourceItem: props.item
    }
  },

  isDragging (props, monitor) {
    return props.id === monitor.getItem().id
  }
}

const target = {
  canDrop (props, monitor) {
    return true
  },

  drop (props, monitor, component) {
    const { sourceItem } = monitor.getItem()
    const { item: targetItem, removeTargetNode, move } = props
    move(sourceItem, targetItem)
    removeTargetNode()
  },
  hover (props, monitor, component) {
    if (monitor.isOver({ shallow: true })) {
      const { item: targetItem, setTargetNode, positionX, positionY, setPosition } = props
      const sourcePosition = monitor.getClientOffset()
      if (!(sourcePosition.x === positionX && sourcePosition.y === positionY)) {
        setPosition(sourcePosition.x, sourcePosition.y)
        setTargetNode(targetItem.id)
      }
    }
  }
}
const DragItem = DropTarget(TYPE, target, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
}))(
  DragSource(TYPE, source, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(Item)
)

const HOCItem = ItemComponent => {
  return class WrapperItem extends Component {
    render () {
      const { dir, draggable } = this.props

      return draggable && dir === 'right' ? (
        <DragItem {...this.props} />
      ) : (
        <ItemComponent {...this.props} />
      )
    }
  }
}
export default HOCItem(Item)
