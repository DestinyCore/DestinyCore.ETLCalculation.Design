import { AndroidOutlined, AppleOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Tabs } from "antd";

import { IOperationConfig } from "../../../shard/operation/operationConfig"
import React from "react";

const { TabPane } = Tabs;
const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};
interface IProp{
    Config:IOperationConfig
}
const TaskOperation = (props: IProp) => {
    const onFinish = (values: any) => {
        console.log(values);
    };
    return (
        <div>
            <Modal title={props.Config.title} visible={props.Config.visible} >
            <Tabs defaultActiveKey="1">
                <TabPane tab={ <span><SettingOutlined />基础信息</span>} key="1">
                    <Form
                        name="nest-messages"
                        onFinish={onFinish}
                        validateMessages={validateMessages}>
                        <Form.Item
                            name={["user", "name"]}
                            label="任务名称"
                            rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={["user", "email"]}
                            label="任务编号"
                            rules={[{ type: "email" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={["user", "website"]} label="任务类型">
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={["user", "age"]}
                            label="任务描述">
                            <Input />
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab={<span><AndroidOutlined />Tab 2</span>} key="2">
                    Tab 2
                </TabPane>
            </Tabs>
            </Modal>
        </div>
    );
};

export default TaskOperation;
