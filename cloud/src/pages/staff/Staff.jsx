import React from 'react';
import styles from './staff.less';
import {Input,Select,Button,Table,Icon} from 'antd';
import {connect} from 'dva';
import router from 'umi/router';

const { Option } = Select;

class Staff extends React.Component {
  
 constructor(props){
 		super(props)
 		this.state={
      form : {
        page:0,
        pageSize:7,
      }
 		}
   }

  handleChange = (value) => {
    value=Number(value);
    this.setState({
      form : {
        ...this.state.form,
        enabled:value,
      }
    });
  }

  changePage = (page,pageSize)=>{
    this.props.dispatch({type:'staff/fetchLoadStaff',payload:{...this.state.form,page:page-1,pageSize:pageSize}});
    this.setState({
      form : {
        ...this.state.form,
        page:page-1,
        pageSize:pageSize,
      }
    });
  }

  changeStaffId = (attr,event)=>{
    let {form} = this.state;
    form[attr] = event.target.value;
    this.setState({
      form,
    });
  }

  search = ()=>{
    this.props.dispatch({type:'staff/fetchLoadStaff',payload:this.state.form});
  }

  toLogs = ()=>{
    router.push('../logs');
  }
  //开关按钮
  changeStatus = (record)=>{
    record.enabled===true?this.props.dispatch({type:'staff/fetchChangeStatus',payload:{form:this.state.form,status:{id:record.id,enabled:false}}}):this.props.dispatch({type:'staff/fetchChangeStatus',payload:{form:this.state.form,status:{id:record.id,enabled:true}}});
  }
  componentDidMount(){
    this.props.dispatch({type:'staff/fetchLoadStaff',payload:this.state.form});
    this.props.staff.staffData.forEach(function(item){
      for(let key in item){
        item[key]===null?item[key]='-':item[key];
      }
    });
    this.setState({
      fromData:this.props.staff.staffData,
    });
  }
  render(){
    const columns = [
      {
        title: '员工id',
        dataIndex: 'id',
        align:'center',
        render: text => <a>{text}</a>,
      },
      {
        title: '所属分站',
        align:'center',
        dataIndex: 'siteVM.name',
      },
      {
        title: '用户名',
        align:'center',
        dataIndex: 'username',
      },
      {
        title: '真实姓名',
        align:'center',
        dataIndex: 'realname',
      },
      {
        title: '手机号',
        align:'center',
        dataIndex: 'telephone',
      },
      {
        title: 'QQ号',
        align:'center',
        dataIndex: 'qq',
      },
      {
        title: '上次登陆时间',
        align:'center',
        dataIndex: 'lastLoginTime',
      },
      {
        title: '上次登录IP',
        align:'center',
        dataIndex: 'lastLoginIp',
      },
      {
        title: '状态',
        align:'center',
        render:(text,record)=>{
          if(record.enabled==true){
            return(
              <div>正常</div>
            ); 
          }else if(record.enabled==false){
            return(
              <div>禁用</div>
            );
          }
        },
      },
      {
        title: '操作',
        align:'center',
        render:(text,record) => {
          if(record.enabled==true){
            return(
              <div>
                <Icon type="stop" title="禁用" style={{color:'red',marginRight:5}} onClick={this.changeStatus.bind(this,record)}/>
                <Icon type="file-text" title="查看日志" onClick={this.toLogs.bind(this,record)}/>
              </div>
            )
          }else if(record.enabled==false){
            return(
              <div>
                <Icon type="check-circle" title="启动" style={{color:'red',marginRight:5}} onClick={this.changeStatus.bind(this,record)}/>
                <Icon type="file-text" title="查看日志" onClick={this.toLogs.bind(this,record)}/>
              </div>
            )
          }
        }
      },
    ];
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>员工管理</div>
        <div className={styles.content_search}>
          <Input allowClear style={{width:100,marginRight:'0.5em'}} placeholder="员工ID" onChange={this.changeStaffId.bind(this,'id')}></Input>
          <Input allowClear style={{width:100,marginRight:'0.5em'}} placeholder="用户名" onChange={this.changeStaffId.bind(this,'username')}></Input>
          <Input allowClear placeholder="手机号" style={{width:100,marginRight:'0.5em'}} onChange={this.changeStaffId.bind(this,'telephone')}></Input>
          <Select allowClear placeholder="状态" style={{ width: 150,marginRight:6 }} onChange={this.handleChange}>
            <Option value="1">正常</Option>
            <Option value="0">禁用</Option>
          </Select>
          <Button type="primary" icon="search" onClick={this.search}>搜索</Button>
        </div>
        <div className={styles.content_content}>
        <Table size="small" rowKey="id" bordered columns={columns} dataSource={this.props.staff.staffData} pagination={{
          total:this.props.staff.total,
          pageSize:6,
          onChange:this.changePage,
        }}/>
        </div>
      </div>
    )
  }
}

export default connect(state=>state)(Staff);