import "./task-operation.less"

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Row, Steps, message } from "antd";

import { IOperationConfig } from "../../../shard/operation/operationConfig"
import React from "react";

const { Step } = Steps;
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
/**
 * form表单布局设置
 */
const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
};
interface IProp {
    Config: IOperationConfig
}
const TaskOperation = (props: IProp) => {
    const onFinish = (values: any) => {
        console.log(values);
    };
    const [current, setCurrent] = React.useState(0);
    const steps = [
        {
            title: '基础信息',
        },
        {
            title: '来源设置',
        },
        {
            title: '目标设置',
        },
    ];
    /**
     * 关闭弹框
     */
    const onCancel = () => {
        if (props.Config.onClose) {
            props.Config.onClose();
        }
        setCurrent(0);
    };
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    return (
        <div>
            <Modal width={1000} title={props.Config.title} closable={false} visible={props.Config.visible}
                footer={[
                    <div key="foot" className="steps-action">
                        <Button key="cancel" style={{ margin: '0 8px' }} onClick={() => onCancel()}>
                            取消
                        </Button>
                        {current > 0 && (
                            <Button key="previous" icon={<ArrowUpOutlined />} style={{ margin: '0 8px' }} onClick={() => prev()}>
                                上一步
                            </Button>
                        )}
                        {current < steps.length - 1 && (
                            <Button key="next" type="primary" icon={<ArrowDownOutlined />} onClick={() => next()}>
                                下一步
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button key="finesh" type="primary" onClick={() => message.success('Processing complete!')}>
                                完成
                            </Button>
                        )}
                    </div>
                ]}>
                <Row className="task-step">
                    <Steps current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                </Row>
                <div className="task-step-content">
                    {
                        current === 0 ?
                            <Form {...formItemLayout}
                                name="nest-messages"
                                onFinish={onFinish}
                                validateMessages={validateMessages}>
                                <Form.Item 
                                    name={["user", "name"]}
                                    label="任务名称"
                                    rules={[{ required: true }]} >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name={["user", "email"]}
                                    label="任务编号"
                                    rules={[{ type: "email" }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name={["user", "website"]} label="任务类型">
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name={["user", "age"]}
                                    label="任务描述">
                                    <Input />
                                </Form.Item>
                            </Form> : null
                    }
                    {
                        current === 1 ?
                            <Form {...formItemLayout}
                                name="nest-messages"
                                onFinish={onFinish}
                                validateMessages={validateMessages}>
                                <Form.Item
                                    name={["user", "name"]}
                                    label="来源数据连接"
                                    rules={[{ required: true }]}
                                >
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
                            </Form> : null
                    }
                </div>
            </Modal>
        </div >
    );
};
export default TaskOperation;
