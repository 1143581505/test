import React, { Component } from 'react';
import { Row, Col } from 'antd';
import styles from './welcome.less';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsData from 'highcharts/modules/data';
import authorize from '@/components/Authorized/Secured';

// 添加data.js
HighchartsData(Highcharts);
// 添加highcharts-more
HighchartsMore(Highcharts);

const chart = {
  title: {
          text: '订单和商家数据'
  },
  subtitle: {
          text: ''
  },
  yAxis: {
          title: {
                  text: ''
          }
  },
  legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
  },
  plotOptions: {
          series: {
                  label: {
                          connectorAllowed: false
                  },
                  pointStart: 2010
          }
  },
  series: [{
          name: '当日发布订单量',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
  }, {
          name: '当日发布商家',
          data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
  }],
  responsive: {
          rules: [{
                  condition: {
                          maxWidth: 500
                  },
                  chartOptions: {
                          legend: {
                                  layout: 'horizontal',
                                  align: 'center',
                                  verticalAlign: 'bottom'
                          }
                  }
          }]
  }
};

class Welcome extends Component {

  componentDidMount(){
    this.chart=new Highcharts['Chart'](this.refs.chart,chart)
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.gutterExample}>
          <Row gutter={16}>
            <Col className="gutter-row" span={6} style={{padding:'0.5em'}}>
              <div className={styles.gutterBox} style={{backgroundColor:'#27a9e3'}}>
                <span>今日放单商家数:&emsp;320家</span><br/>
                <span>今日注册商家数:&emsp;28家</span><br/>
                <span>总注册商家数:&emsp;32家</span><br/>
              </div>
            </Col>
            <Col className="gutter-row" span={6} style={{padding:'0.5em'}}>
              <div className={styles.gutterBox} style={{backgroundColor:'#28b779'}}>
                <span>今日放单量:&emsp;320家</span><br/>
                <span>进行中刷单:&emsp;28家</span><br/>
                <span>待接订单量:&emsp;32家</span><br/>
              </div>
            </Col>
            <Col className="gutter-row" span={6} style={{padding:'0.5em'}}>
              <div className={styles.gutterBox} style={{backgroundColor:'#ffb748'}}>
                <span>总注册推广员:&emsp;320人</span><br/>
                <span>总推广定单:&emsp;28家</span><br/>
                <span>总推广分成:&emsp;32</span><br/>
              </div>
            </Col>
            <Col className="gutter-row" span={6} style={{padding:'0.5em'}}>
              <div className={styles.gutterBox} style={{backgroundColor:'#2255a4'}}>
                <span>今日收入:&emsp;320元</span><br/>
                <span>待结收入:&emsp;28元</span><br/>
                <span>累计结算收入:&emsp;32元</span><br/>
              </div>
            </Col>
          </Row>
        </div>
        <div ref="chart" style={{maxWidth:800,height:400,margin:'auto'}}></div>
      </div>
    );
  }
}

export default Welcome;


