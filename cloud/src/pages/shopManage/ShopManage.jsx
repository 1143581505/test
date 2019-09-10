import React from 'react';
import styles from './shopManage.less';
import {Input,Button,Table,Icon,Select,DatePicker} from 'antd';
import {connect} from 'dva';
import router from 'umi/router';

const {Option} = Select;
const {RangePicker} = DatePicker;

class ShopManage extends React.Component {
  
 constructor(props){
 		super(props)
 		this.state={
      shopManage : {
        page:0,
        pageSize:10,
      }
 		}
   }

  changePage = (page,pageSize)=>{
    this.props.dispatch({type:'shopManage/fetchLoadShopManage',payload:{...this.state.shopManage,page:page-1,pageSize:pageSize}});
    this.setState({
      shopManage : {
        ...this.state.shopManage,
        page:page-1,
        pageSize:pageSize,
      }
    });
  }

  changeStaffId = (attr,event)=>{
    let {shopManage} = this.state;
    shopManage[attr] = event.target.value;
    this.setState({
      shopManage,
    });
  }

  search = ()=>{
    this.props.dispatch({type:'shopManage/fetchLoadShopManage',payload:this.state.shopManage});
  }

  toLogs = ()=>{
    router.push('../logs');
  }

  componentDidMount(){
    this.props.dispatch({type:'shopManage/fetchLoadShopManage',payload:this.state.shopManage});
  }

  toDetails = ()=>{
    router.push('/shopManage/shopManageDetails');
  } 

  render(){
    const columns = [
      {
        title: '店铺ID',
        dataIndex: 'id',
        align:'center',
        //fixed:'left',
        //width:100,
        render: (text,record) => <a onClick={this.toDetails.bind(this,record)}>{text}</a>,
      },
      {
        title: '商家ID',
        align:'center',
        dataIndex: 'businesId',
      },
      {
        title: '商家手机号',
        align:'center',
        dataIndex: 'sendoutTelephone',
      },
      {
        title: '店铺名称',
        align:'center',
        dataIndex: 'name',
      },
      {
        title: '店铺旺旺id',
        align:'center',
        dataIndex: 'wwid',
      },
      {
        title: '所属平台',
        align:'center',
        dataIndex: 'businessVM.site.name',
      },
      {
        title: '接单间隔时间',
        align:'center',
        dataIndex: 'bindTime',
      },
      {
        title: '注册时间',
        align:'center',
        dataIndex: 'businessVM.registerTime',
      },
      {
        title: '店铺状态',
        align:'center',
        render:(text,record)=>{
          if(record.status=='true'){
            return(
              <div>正常</div>
            ); 
          }else if(record.status=='false'){
            return(
              <div>停用</div>
            );
          }
        },
      },
      {
        title: '操作',
        //fixed:'right',
        align:'center',
        //width:100,
        render:(text,record) => {
          if(record.enabled==true){
            return(
              <div>
                <Icon type="stop" title="禁用" style={{color:'red',marginRight:5}}/>
                <Icon type="file-text" title="查看日志" onClick={this.toLogs.bind(this,record)}/>
              </div>
            )
          }else if(record.enabled==false){
            return(
              <div>
                <Icon type="check-circle" title="启动" style={{color:'red',marginRight:5}}/>
                <Icon type="file-text" title="查看日志" onClick={this.toLogs.bind(this,record)}/>
              </div>
            )
          }
        }
      },
    ];
    return (
      <div className={styles.content}>
        <div className={styles.content_title}> 推广员管理</div>
        <Button type="primary">导出</Button>
        <div className={styles.content_search}>
          <RangePicker allowClear placeholder={['注册时间','注册时间']} onChange={this.dateChange} style={{width:190,marginRight:'0.5em'}}/>
          <Input allowClear style={{width:100,marginRight:'0.5em'}} placeholder="商家ID" onChange={this.changeStaffId.bind(this,'id')}></Input>
          <Select allowClear placeholder="所属平台" style={{ width: 110,marginRight:6 }}>
            <Option value="0">新手上路</Option>
            <Option value="1">普通用户</Option>
            <Option value="2">高级用户</Option>
          </Select>
          <Select allowClear placeholder="店铺状态" style={{ width: 120,marginRight:6 }}>
            <Option value="0">待审核</Option>
            <Option value="1">审核通过</Option>
            <Option value="1">审核未通过</Option>
          </Select>
          <Button type="primary" icon="search" onClick={this.search}>搜索</Button>
        </div>
        <div className={styles.content_content}>
        <Table size="small" rowKey="id" bordered columns={columns} dataSource={this.props.shopManage.shopManageData} pagination={{
          total:this.props.shopManage.total,
          pageSize:6,
          onChange:this.changePage,
        }}/>
        </div>
      </div>
    )
  }
}

export default connect(state=>state)(ShopManage);