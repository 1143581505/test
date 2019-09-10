import React from 'react';
import styles from './newsCenter.less';
import {Input,Button,Table,DatePicker,Select,Drawer,Form,Col,Row,Radio,Icon} from 'antd';
import {connect} from 'dva';
import dateParse from '../../utils/dateParse';

const {RangePicker} = DatePicker;
const { Option } = Select;

class NewsCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsCenter:{
        page:0,
        pageSize:7,
        siteId:2,
      },
      messageTitle:'',
      modelData:{
        contentSource:'123',
        userId:1,
        siteId:2,
        publishTime:Number(new Date().getTime()),
      },
    };
  }
  
  //组件加载完毕事件
  componentDidMount(){
    this.props.dispatch({type:'newsCenter/fetchLoadNewsCenter',payload:this.state.newsCenter});
  }

  //时间选择框改变事件
  dateChange = (date, dateString)=>{
    let date1 = new Date(dateString[0]);
    date1 = date1.getTime();
    let date2 = new Date(dateString[1]);
    date2 = date2.getTime();
    this.setState({
      newsCenter : {
        ...this.state.newsCenter,
        beginTime:date1,
        endTime:date2,
      }
    });
  }

  //页码改变发生事件
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

  //下拉框改变事件
  handleChange = (value) => {
    value=Number(value);
    this.setState({
      form : {
        ...this.state.form,
        enabled:value,
      }
    });
  }

  //Input框改变事件
  changeNewsCenter = (attr,event)=>{
    let {newsCenter} = this.state;
    newsCenter[attr] = event.target.value;
    this.setState({
      newsCenter,
    });
  }

  showDrawer = (title,obj) => {
    if(title=='新增'){
      this.props.form.resetFields();
    }else{
      this.props.form.setFieldsValue({title:obj.title});
      this.props.form.setFieldsValue({receiver:obj.receiver});
      this.props.form.setFieldsValue({content:obj.content});
    }
    this.setState({
      visible: true,
      messageTitle:title,
      modelData:{
        ...this.state.modelData,
        id:obj.id,
      }
    });
  };

  onClose = (attr) => {
    this.setState({
      visible: false,
    });
    if(attr=='tiJiao'){
      let newsCenterAdd = Object.assign({},this.state.modelData,this.props.form.getFieldsValue());
      this.props.dispatch({type:'newsCenter/fetchLoadAddNewsCenter',payload:{newsCenterAdd,newsCenter:this.state.newsCenter}});
    }
  };

  //发布按钮
  changeStatus = (record)=>{
    let statusData = '';
    let id = Number(record.id);
    record.status=='已发布'?statusData='未发布':statusData='已发布';
    this.props.dispatch({type:'newsCenter/fetchLoadStatusNewsCenter',payload:{status:{status:statusData,id},newsCenter:this.state.newsCenter}});
  }

  //删除数据
  deleteData = (record)=>{
    this.props.dispatch({type:'newsCenter/fetchLoadDeleteNewsCenter',payload:{deleteData:{id:record.id},newsCenter:this.state.newsCenter}});
  }
 
  render(){    
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        align:'center',
        render: text => <a>{text}</a>,
      },
      {
        title: '状态',
        align:'center',
        dataIndex: 'status',
      },
      {
        title: '通知人群',
        align:'center',
        dataIndex: 'receiver',
      },
      {
        title: '创建时间',
        align:'center',
        dataIndex: 'createTime',
        render:(text,record)=>{
          return (
            <div>{dateParse(record.createTime)}</div>
          );
        }
      },
      {
        title: '发布时间',
        align:'center',
        dataIndex: 'checkTime',
        render:(text,record)=>{
          return (
            <div>{dateParse(record.checkTime)}</div>
          );
        }
      },
      {
        title: '操作',
        align:'center',
        render:(text,record) => {
          return (
            <div>
              <Icon type="edit" title='修改信息' style={{marginRight:'1em'}} onClick={this.showDrawer.bind(this,'修改',record)}/>
              <Icon type="diff" title='发布' style={{marginRight:'1em'}} onClick={this.changeStatus.bind(this,record)}/>
              <Icon type="delete" title='删除' onClick={this.deleteData.bind(this,record)}/>
            </div>
          );
        }
      },
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>消息管理</div>
        <Button type='primary' onClick={this.showDrawer.bind(this,'新增')}>新增</Button>
        <div className={styles.content_search}>
          <RangePicker allowClear placeholder={['创建日期','创建日期']} onChange={this.dateChange} style={{marginRight:'0.5em'}}/>
          <Select allowClear placeholder="状态" style={{ width: 150,marginRight:6 }} onChange={this.changeNewsCenter.bind(this,'id')}>
            <Option value="0">未发布</Option>
            <Option value="1">已发布</Option>
          </Select>
          <Input allowClear style={{width:100,marginRight:'0.5em'}} placeholder="公告标题" onChange={this.changeNewsCenter.bind(this,'id')}></Input>
          <Select allowClear placeholder="通知人群" style={{ width: 150,marginRight:6 }} onChange={this.changeNewsCenter.bind(this,'id')}>
            <Option value="0">推广员</Option>
            <Option value="1">商家</Option>
          </Select>
          <Button type="primary" icon="search" onClick={this.search}>搜索</Button>
        </div>
        <div className={styles.content_content}>
        <Table size="small" rowKey="id" bordered columns={columns} dataSource={this.props.newsCenter.newsCenterData} pagination={{
          total:this.props.newsCenter.total,
          pageSize:6,
          onChange:this.changePage,
        }}/>
        </div>
        <div>
          <Drawer
            title={this.state.messageTitle+'消息'}
            width={720}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="标题">
                    {getFieldDecorator('title', {
                      rules: [{ required: true, message: '请输入标题内容' }],
                    })(<Input placeholder="请输入标题内容"/>)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="通知人群">
                    {getFieldDecorator('receiver', {
                      rules: [{ required: true, message: '请选择要通知的人群' }],
                    })(
                      <Radio.Group>
                        <Radio value="商家" style={{marginRight:240}}>商家</Radio>
                        <Radio value="推广员">推广员</Radio>
                      </Radio.Group>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={50}>
                <Col span={24}>
                  <Form.Item label="内容">
                    {getFieldDecorator('content', {
                      rules: [
                        {
                          required: true,
                          message: '请输入文章内容',
                        },
                      ],
                    })(<Input.TextArea style={{height:260}} rows={4} placeholder="开始编辑"/>)}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose.bind(this,'quXiao')} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button onClick={this.onClose.bind(this,'tiJiao')} type="primary">
                提交
              </Button>
            </div>
          </Drawer>
        </div>
      </div>
    )
  }
}

const News = Form.create()(NewsCenter);

export default connect(state=>state)(Form.create()(NewsCenter));