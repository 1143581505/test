import React, { Component } from 'react';
import { Tabs } from 'antd';
import One from './One';
import Two from './Two';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class MarketDetails extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="推广员详情" key="1">
                    <One></One>
                </TabPane>
                <TabPane tab="账户信息" key="2">
                    <Two></Two>
                </TabPane>
            </Tabs>
        );
    }
}

export default MarketDetails;