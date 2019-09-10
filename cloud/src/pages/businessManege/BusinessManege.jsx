import React from 'react';
import styles from './businessManege.less';
import {Input,Button,Table,Icon,Select,DatePicker} from 'antd';
import {connect} from 'dva';
import router from 'umi/router';

const {Option} = Select;
const {RangePicker} = DatePicker;

class BusinessManege extends React.Component {
  
 constructor(props){
 		super(props)
 		this.state={
      businessManege : {
        page:0,
        pageSize:10,
      },
      visible: false,
 		}
   }

  changePage = (page,pageSize)=>{
    this.props.dispatch({type:'businessManege/fetchLoadBusinessManege',payload:{...this.state.businessManege,page:page-1,pageSize:pageSize}});
    this.setState({
      businessManege : {
        ...this.state.businessManege,
        page:page-1,
        pageSize:pageSize,
      }
    });
  }

  changeBusinessManege = (attr,event)=>{
    let {businessManege} = this.state;
    businessManege[attr] = event.target.value;
    this.setState({
      businessManege,
    });
  }

  handleChange = (value) => {
    if(value=='true'||value=='false'){
      this.setState({
        businessManege : {
          ...this.state.businessManege,
          status:value,
        }
      });
    }else{
      this.setState({
        businessManege : {
          ...this.state.businessManege,
          rank:value,
        }
      });
    }
  }

  search = ()=>{
    this.props.dispatch({type:'businessManege/fetchLoadBusinessManege',payload:this.state.businessManege});
  }

  componentDidMount(){
    this.props.dispatch({type:'businessManege/fetchLoadBusinessManege',payload:this.state.businessManege});
  }

  toDetails = ()=>{
    router.push('/businessManege/businessManegeDetails');
  }

  render(){
    const columns = [
      {
        title: '商家ID',
        dataIndex: 'id',
        align:'center',
        fixed:'left',
        width:100,
        render: (text,record) => <a onClick={this.toDetails.bind(this,record)}>{text}</a>,
      },
      {
        title: '手机号',
        align:'center',
        dataIndex: 'telephone',
      },
      {
        title: 'QQ',
        align:'center',
        dataIndex: 'qq',
      },
      {
        title: '本金余额',
        align:'center',
        dataIndex: 'accountBj',
      },
      {
        title: '佣金余额',
        align:'center',
        dataIndex: 'accountYj',
      },
      {
        title: '累计充值',
        align:'center',
        dataIndex: 'allRechargeCount',
      },
      {
        title: '邀请ID',
        align:'center',
        dataIndex: 'managerId',
      },
      {
        title: '注册时间',
        align:'center',
        dataIndex: 'registerTime',
      },
      {
        title: '用户等级',
        align:'center',
        dataIndex: 'rank',
      },
      {
        title: '状态',
        align:'center',
        render:(text,record)=>{
          if(record.status=='true'){
            return(
              <div>正常</div>
            ); 
          }else if(record.status=='false'){
            return(
              <div>禁用</div>
            );
          }
        },
      },
      {
        title: '备注',
        align:'center',
        dataIndex: 'comment',
      },
      {
        title: '操作',
        fixed:'right',
        align:'center',
        width:100,
        render:(text,record) => {
          return (
            <div></div>
          );
        }
      },
    ];
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>商户管理</div>
        <Button type="primary">导出</Button>
        <div className={styles.content_search}>
          <RangePicker allowClear placeholder={['注册时间','注册时间']} onChange={this.dateChange} style={{width:260,marginRight:'0.5em'}}/>
          <Input allowClear style={{width:100,marginRight:'0.5em'}} placeholder="商家ID" onChange={this.changeBusinessManege.bind(this,'id')}></Input>
          <Input allowClear style={{width:100,marginRight:'0.5em'}} placeholder="手机号" onChange={this.changeBusinessManege.bind(this,'telephone')}></Input>
          <Select allowClear placeholder="用户等级" style={{ width: 110,marginRight:6 }} onChange={this.handleChange}>
            <Option value="新手上路">新手上路</Option>
            <Option value="普通用户">普通用户</Option>
            <Option value="高级用户">高级用户</Option>
          </Select>
          <Select allowClear placeholder="状态" style={{ width: 100,marginRight:6 }} onChange={this.handleChange}>
            <Option value="false">禁用</Option>
            <Option value="true">正常</Option>
          </Select>
          <Select allowClear placeholder="排序规则" style={{ width: 120,marginRight:6 }}>
            <Option value="0">时间升序</Option>
            <Option value="1">时间降序</Option>
            <Option value="3">本金余额升序</Option>
            <Option value="4">本金余额降序</Option>
            <Option value="5">累计充值升序</Option>
            <Option value="6">累计充值降序</Option>
          </Select>
          <Button type="primary" icon="search" onClick={this.search}>搜索</Button>
        </div>
        <div className={styles.content_content}>
        <Table size="small" rowKey="id" scroll={{ x: 1300 }} bordered columns={columns} dataSource={this.props.businessManege.businessManegeData} pagination={{
          total:this.props.businessManege.total,
          pageSize:6,
          onChange:this.changePage,
        }}/>
        </div>
      </div>
    )
  }
}

export default connect(state=>state)(BusinessManege);