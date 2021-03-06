import Tabs from '../../../components/tabs'
import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
const prefix = 'tabs-description'
const desc = '需要为标签进行解释或附加信息时，4-6 个时使用'

const code = `import Tabs from '@hi-ui/hiui/es/tabs'
import React from 'react'\n
class Demo extends React.Component {
  constructor() {
    super()
    this.state = {
      panes: [
        {
          tabName: '我的订单',
          tabKey: 'tabKey-1',
          tabDesc: '关于标签的描述信息'
        },
        {
          tabName: '团购订单',
          tabKey: 'tabKey-2',
          closable: false,
          tabDesc: '关于标签的描述信息'
        },
        {
          tabName: '以旧换新订单',
          tabKey: 'tabKey-3',
          tabDesc: '关于标签的描述信息'
        },
        {
          tabName: '消息通知',
          tabKey: 'tabKey-4',
          tabDesc: '关于标签的描述信息'
        }
      ]
    }
  }
  render () {
    return (
      <Tabs type="desc" activeTabKey="1" onTabClick={(tab,e)=>console.log(tab,e)}>
      {
        this.state.panes.map((pane, index) => {
          return (
            <Tabs.Pane
              tabName={pane.tabName}
              tabDesc={pane.tabDesc}
              tabKey={pane.tabKey}
              closable={pane.closable}
              key={index}
            >
              <div style={{padding: '16px'}}>{pane.tabName}</div>
            </Tabs.Pane>
          )
        })
      }
    </Tabs>
    )
  }
}`

const Demo = () => <DocViewer code={code} scope={{ Tabs }} desc={desc} prefix={prefix} />
export default Demo
