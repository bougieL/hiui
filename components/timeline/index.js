import React, { Component } from 'react'
import classNames from 'classnames'
import Provider from '../context'
import './style/index'
import FoldingItem from './foldingItem'

const Time = (props) => {
  return (
    <div className='hi-timeline__time'>
      {props.groupTitle && <div style={props.groupTitle ? {marginTop: -22} : {}} className='hi-timeline__group-title'>{props.groupTitle}</div>}
      {props.item.timestamp}
      {
        <div className='hi-timeline__extra-time'>{props.item.extraTime}</div>
      }
    </div>
  )
}
class Timeline extends Component {
  /**
    * 渲染列表项
    * @param {*} item 原始数据
    * @param {*} index 用于是否渲染 groupTitle 的条件
    * @param {*} groupTitle 分组标题
    * @param {*} isSub 是否是子项，只支持一级
    */
  renderItem (item, index, groupTitle, isSub) {
    const { layout } = this.props
    const dot = item.dot
    let dotEl = isSub ? <div className='hi-timeline__dot hi-timeline__dot--sub' /> : <div className='hi-timeline__dot' />
    if (dot && typeof dot === 'object') {
      dotEl = <div className='hi-timeline__dot hi-timeline__dot--custom' >
        {dot}
      </div>
    }
    const itemCls = classNames(
      'hi-timeline__item',
      isSub && 'hi-timeline__item--sub'
    )
    return <li className={itemCls} key={item.title + index}>
      {
        layout === 'normal' && <Time item={item} groupTitle={index === 0 && groupTitle} />
      }
      <div className='hi-timeline__row'>
        {
          layout === 'cross' && <Time item={item} />
        }
        <div className='hi-timeline__content-container'>
          <div className='hi-timeline__title'>{item.title}</div>
          <div className='hi-timeline__desc'>{item.description}</div>
          {
            layout === 'right' && (
              <div className='hi-timeline__time--extra'>{item.timestamp}</div>
            )
          }
        </div>
      </div>
      <div className='hi-timeline__line' />
      {dotEl}
    </li>
  }
  /**
   * 渲染列表，被递归调用
   * @param {Array} datas 数据
   * @param {String | React.ReactNode} groupTitle  分组标题
   * @param {Number} originIndex  原始索引，用于判断是否为第一个分组标题
   */
  renderItems (datas, groupTitle, isSub) {
    const { layout, localeDatas } = this.props
    return datas.map((item, index) => {
      const { groupTitle: gt, folding } = item
      if (gt) {
        // 渲染分组
        return this.renderItems(item.children, gt)
      }
      if (folding && layout !== 'cross') {
        // 子项 含 收起按钮
        const foldingEl = <FoldingItem
          key={index}
          texts={localeDatas.timeline}
          subChildren={this.renderItems(item.children, null, true)}
        />
        // 如果含有子项，需先渲染当前项
        let el = this.renderItem(item, index, groupTitle)
        return [el, foldingEl]
      }
      return this.renderItem(item, index, groupTitle, isSub)
    })
  }

  render () {
    const { layout, list } = this.props
    const rootCls = classNames(
      'hi-timeline',
      `hi-timeline--${layout}`
    )
    return <div className={rootCls}>
      <ul>
        {
          this.renderItems(list)
        }
      </ul>
    </div>
  }
}
Timeline.defaultProps = {
  layout: 'normal'
}
export default Provider(Timeline)
