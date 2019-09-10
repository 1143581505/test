import React from 'react';
import styles from './logs.less';
import {Input,Button,Table,Icon,DatePicker} from 'antd';
import {connect} from 'dva';
import dateParse from '../../utils/dateParse';

const {RangePicker} = DatePicker;

class Logs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      logs:{
        page:0,
        pageSize:7,
      },
    };
  }
  
 
  //时间选择框改变事件
  dateChange = (date, dateString)=>{
    let date1 = new Date(dateString[0]);
    date1 = date1.getTime();
    let date2 = new Date(dateString[1]);
    date2 = date2.getTime();
    this.setState({
      logs : {
        ...this.state.logs,
        beginTime:date1,
        endTime:date2,
      }
    });
  }

  //操作人Id框改变事件
  changeLogs = (attr)=>{
    let {logs} = this.state;
    logs[attr] = event.target.value;
    this.setState({
      logs,
    });
  }

  //组件加载后
  componentDidMount(){
    this.props.dispatch({type:'logs/fetchLoadLogs',payload:this.state.logs});
  }

  //页面更改事件
  changePage = (page,pageSize)=>{
    this.props.dispatch({type:'logs/fetchLoadLogs',payload:{...this.state.logs,page:page-1,pageSize:pageSize}});
    this.setState({
      logs : {
        ...this.state.logs,
        page:page-1,
        pageSize:pageSize,
      }
    });
  }

  //搜索触发事件
  search = ()=>{
    console.log(this.state.logs);
    this.props.dispatch({type:'logs/fetchLoadLogs',payload:this.state.logs});
  }

  render(){
    const columns = [
      {
        title: '日志ID',
        dataIndex: 'id',
        align:'center',
        render: text => <a>{text}</a>,
      },
      {
        title: '操作者ID',
        align:'center',
        dataIndex: 'userId',
      },
      {
        title: '内容',
        align:'center',
        dataIndex: 'actionContent',
      },
      {
        title: '操作时间',
        align:'center',
        render:(text,record)=>{
          let time = dateParse(record.actionTime);
          return (
            <div>{time}</div>
          );
        }
      },
    ];
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>日志管理</div>
        <div className={styles.content_search}>
          <RangePicker allowClear placeholder={['日志时间','日志时间']} onChange={this.dateChange} style={{marginRight:'0.5em'}}/>
          <Input allowClear style={{width:100,marginRight:'0.5em'}} placeholder="操作人ID" onChange={this.changeLogs.bind(this,'userId')}></Input>
          <Button type="primary" icon="search" onClick={this.search}>搜索</Button>
        </div>
        <div className={styles.content_content}>
        <Table size="small" rowKey="id" bordered columns={columns} dataSource={this.props.logs.logsData} pagination={{
          total:this.props.logs.total,
          pageSize:7,
          onChange:this.changePage,
        }}/>
        </div>
      </div>
    )
  }
}

export default connect(state=>state)(Logs);