import "./task-operation.less"

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Row, Select, Steps, message } from "antd";
import React, { useEffect, useState } from "react";

import IDbConnectionService from "@/domain/dbconnection-domain/dbconnection-service/idbconnectionservice";
import { IOperationConfig } from "../../../shard/operation/operationConfig"
import { ISelectListItem } from "@/shard/ajax/response";
import { IocTypes } from "@/shard/inversionofcontrol/ioc-config-types";
import { ScheduletTaskInputDto } from "@/domain/scheduletask-domain/scheduletask-entities/scheduleTaskentitie"
import { TaskTypeEnumList } from "@/domain/scheduletask-domain/scheduletask-entities/tasktype-enum"
import useHookProvider from "@/shard/dependencyInjection/ioc-hook-provider";

const { Step } = Steps;
const { Option } = Select;
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
const initbasicformData = new ScheduletTaskInputDto();
const taskTypeArray = TaskTypeEnumList
const TaskOperation = (props: IProp) => {
    const _dbconnectionservice: IDbConnectionService = useHookProvider(IocTypes.DbConnectionService);
    const [itemlist, setSelectListItem] = useState<Array<ISelectListItem>>([]);
    /**
     * 
     * @param values 
     */
    const onFinish = (values: any) => {
        // console.log(values);
    };
    const [basicFormData] = Form.useForm();
    const [sourceFormData] = Form.useForm();
    useEffect(() => {
        basicFormData.setFieldsValue(initbasicformData)
        getSelectlist()
    }, [])
    const [current, setCurrent] = React.useState(0);
    const steps = [
        {
            title: '基础信息',
        },
        {
            title: '数据来源设置',
        },
        {
            title: '数据目标设置',
        },
    ];
    const getSelectlist = async () => {
        let result = await _dbconnectionservice.getselectlistitem();
        if (result.success) {
            setSelectListItem(result.data);
            console.log(itemlist)
        }
    }
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
        console.log(basicFormData.getFieldsValue());//判断下一步是否清洗数据
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    return (
        <div>
            <Modal getContainer={false} width={1000} title={props.Config.title} closable={false} visible={props.Config.visible}
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
                            <Form form={basicFormData} {...formItemLayout}
                                name="nest-messages"
                                onFinish={onFinish}
                                validateMessages={validateMessages}>
                                <Form.Item
                                    name="taskName"
                                    label="任务名称"
                                    rules={[{ required: true }]} >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="taskNumber"
                                    label="任务编号"
                                    rules={[{ type: "email" }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="taskType" label="任务类型">
                                    <Select>
                                        {
                                            taskTypeArray.map((item: any) => {
                                                return <Option key={item.type} value={item.type}>{item.label}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="describe"
                                    label="任务描述">
                                    <Input />
                                </Form.Item>
                            </Form> : null
                    }
                    {
                        current === 1 ?
                            <Form {...formItemLayout} form={sourceFormData} 
                                name="nest-messages"
                                onFinish={onFinish}
                                validateMessages={validateMessages}>
                                <Form.Item
                                    name="user"
                                    label="来源数据连接"
                                    rules={[{ required: true }]}
                                >
                                    <Select>
                                        {
                                            itemlist.map(item => {
                                                return <Option key={item.value} value={item.value}>{item.text}</Option>
                                            }
                                            )
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="user"
                                    label="源数据库"
                                    rules={[{ type: "email" }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="user" label="任务类型">
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="user"
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
