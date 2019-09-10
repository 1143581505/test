import React from 'react';
import styles from './market.less';
import {Input,Button,Table,Icon} from 'antd';
import {connect} from 'dva';
import router from 'umi/router';

class Market extends React.Component {
  
 constructor(props){
 		super(props)
 		this.state={
      market : {
        page:0,
        pageSize:10,
        siteId:2,
      }
 		}
   }

  changePage = (page,pageSize)=>{
    this.props.dispatch({type:'market/fetchLoadMarket',payload:{...this.state.market,page:page-1,pageSize:pageSize}});
    this.setState({
      market : {
        ...this.state.market,
        page:page-1,
        pageSize:pageSize,
      }
    });
  }

  changeStaffId = (attr,event)=>{
    let {market} = this.state;
    market[attr] = event.target.value;
    this.setState({
      market,
    });
  }

  search = ()=>{
    this.props.dispatch({type:'market/fetchLoadMarket',payload:this.state.market});
  }

  toLogs = ()=>{
    router.push('../logs');
  }

  componentDidMount(){
    this.props.dispatch({type:'market/fetchLoadMarket',payload:this.state.market});
  }

  toDetails = ()=>{
    router.push('/market/marketDetails');
  } 

  render(){
    const columns = [
      {
        title: '推广员ID',
        dataIndex: 'id',
        align:'center',
        fixed:'left',
        width:100,
        render: (text,record) => <a onClick={this.toDetails.bind(this,record)}>{text}</a>,
      },
      {
        title: '用户名',
        align:'center',
        dataIndex: 'username',
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
        title: '微信',
        align:'center',
        dataIndex: 'wxid',
      },
      {
        title: '推广商家数',
        align:'center',
        dataIndex: 'allBusinesNum',
      },
      {
        title: '账户余额',
        align:'center',
        dataIndex: 'totalDeposits',
      },
      {
        title: '累计分成金额',
        align:'center',
        dataIndex: 'allWithdrawCount',
      },
      {
        title: '订单分成比例',
        align:'center',
        dataIndex: 'ratio',
      },
      {
        title: '上次登录时间',
        align:'center',
        dataIndex: 'lastLoginTime',
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
        <Button type="primary" style={{marginRight:'0.5em'}}>新增</Button>
        <Button type="primary">导出</Button>
        <div className={styles.content_search}>
          <Input allowClear style={{width:100,marginRight:'0.5em'}} placeholder="推广员ID" onChange={this.changeStaffId.bind(this,'id')}></Input>
          <Input allowClear style={{width:100,marginRight:'0.5em'}} placeholder="手机号" onChange={this.changeStaffId.bind(this,'username')}></Input>
          <Input allowClear style={{width:100,marginRight:'0.5em'}} placeholder="用户名" onChange={this.changeStaffId.bind(this,'telephone')}></Input>
          <Input allowClear style={{width:100,marginRight:'0.5em'}} placeholder="QQ" onChange={this.changeStaffId.bind(this,'telephone')}></Input>
          <Input allowClear style={{width:100,marginRight:'0.5em'}} placeholder="微信" onChange={this.changeStaffId.bind(this,'telephone')}></Input>
          <Button type="primary" icon="search" onClick={this.search}>搜索</Button>
        </div>
        <div className={styles.content_content}>
        <Table size="small" rowKey="id" scroll={{ x: 1300 }} bordered columns={columns} dataSource={this.props.market.marketData} pagination={{
          total:this.props.market.total,
          pageSize:6,
          onChange:this.changePage,
        }}/>
        </div>
      </div>
    )
  }
}

export default connect(state=>state)(Market);