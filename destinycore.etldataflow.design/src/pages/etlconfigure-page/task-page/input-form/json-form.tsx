import { Button, Form, Input, Modal, Row, Select, Steps, Tabs, message } from "antd";

import React from 'react'

const { TabPane } = Tabs;
/**
 * form表单布局设置
 */
const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
};
const JsonForm = () => {
    return (
        <div>

            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="基础配置" key="1">
                <Form  {...formItemLayout}
                name="nest-messages">
                <Form.Item
                    name="host"
                    label="主机地址："
                    rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="userName"
                    label="用户名："
                    rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="passWord"
                    label="密码："
                    rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="targetfilePath"
                    label="文件或路径："
                    rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
                </TabPane>
                <TabPane tab="Card Tab 2" key="2">
                    Content of card tab 2
                </TabPane>
                <TabPane tab="Card Tab 3" key="3">
                    Content of card tab 3
                </TabPane>
            </Tabs>
        </div>
    )
}

export default JsonForm