import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
import Table from '../../../components/table'
const prefix = 'table-unfold'
const code = `
import React from 'react'
import Table from '@hi-ui/hiui/es/table'\n
class Demo extends React.Component {
  constructor(props){
    super(props)

    this.columns = [
         { title: 'Column 1', dataIndex: 'age', key: '0' ,type:'expand',render(text,record,index){
           return (
             <div style={{wordWrap:'break-word'}}>{text}-{index}</div>
           )
         }},
      { title: 'Column 1', dataIndex: 'address', key: '1' },
      { title: 'Column 2', dataIndex: 'address', key: '2' },
      { title: 'Column 3', dataIndex: 'address', key: '3' },
      { title: 'Column 4', dataIndex: 'address', key: '4' },
      { title: 'Column 5', dataIndex: 'address', key: '5' },
      { title: 'Column 6', dataIndex: 'address', key: '6' },
      { title: 'Column 7', dataIndex: 'address', key: '7' },
      { title: 'Column 8', dataIndex: 'address', key: '8' }
    ]

    this.data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York Park'
    }, {
      key: '2',
      name: 'Jim Green',
      age: 40,
      address: 'London Park'
    }]
  }
  render() {
    return <Table columns={this.columns} data={this.data} fixTop={56} scrollX >
  }
}`

const DemoUnfold = () => (
  <DocViewer
    code={code}
    scope={{ Table }}
    prefix={prefix}
  />
)
export default DemoUnfold
