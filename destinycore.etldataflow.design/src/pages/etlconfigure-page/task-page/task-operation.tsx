import "./task-operation.less"
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/theme/erlang-dark.css';
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/selection/active-line"; //光标行背景高亮，配置里面也需要styleActiveLine设置为true
import "codemirror/keymap/sublime"; //sublime编辑器效果
import "codemirror/addon/display/autorefresh";
import "codemirror/addon/hint/anyword-hint.js";

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Row, Select, Steps, message } from "antd";
import { JsonInputType, JsonInputTypeEnumList, TaskTypeEnum, TaskTypeEnumList } from "@/domain/scheduletask-domain/scheduletask-entities/tasktype-enum"
import React, { useEffect, useState } from "react";

import CodeMirror from 'react-codemirror';
import IDbConnectionService from "@/domain/dbconnection-domain/dbconnection-service/idbconnectionservice";
import { IOperationConfig } from "../../../shard/operation/operationConfig"
import { ISelectListItem } from "@/shard/ajax/response";
import { IocTypes } from "@/shard/inversionofcontrol/ioc-config-types";
import { ScheduletTaskInputDto } from "@/domain/scheduletask-domain/scheduletask-entities/scheduleTaskentitie"
import useHookProvider from "@/shard/dependencyInjection/ioc-hook-provider";

// import 'codemirror/theme/ambiance.css';  

// options = {
//         value: "",
//         mode: "python",
//         theme: "ambiance",
//         readOnly: false,
//         keyMap: "sublime", // 快键键风格
//         lineNumbers: true, // 显示行号
//         smartIndent: true, //智能缩进
//         indentUnit: 4, // 智能缩进单位为4个空格长度
//         indentWithTabs: true, // 使用制表符进行智能缩进
//         lineWrapping: true, //
//         // 在行槽中添加行号显示器、折叠器、语法检测器`
//         gutters: [
//           "CodeMirror-linenumbers",
//           "CodeMirror-foldgutter",
//           "CodeMirror-lint-markers"
//         ],
//         foldGutter: true, // 启用行槽中的代码折叠
//         autofocus: true, //自动聚焦
//         // matchBrackets: true,// 匹配结束符号，比如"]、}"
//         autoCloseBrackets: true, // 自动闭合符号
//         styleActiveLine: true, // 显示选中行的样式
//         tabSize: 4,
//         line: true,
//         styleSelectedText: true,
//         showCursorWhenSelecting: true,
//         extraKeys: { Ctrl: "autocomplete" },
//         hintOptions: {
//           completeSingle: false
//         },
//         lineNumberFormatter: function() {
//           //当前的this指向是cmOptions；
//           return arguments[0] + this.lastLineBefore;
//         },
//         lastLineBefore: 0
//       };

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
const codeMirrorOptions = {
    lineNumbers: true,                     //显示行号  
    mode: { name: "text/x-csharp" },          //定义mode  
    extraKeys: { "Ctrl": "autocomplete" },   //自动提示配置  
    indentUnit: 4, // 智能缩进单位为4个空格长度
    theme: "erlang-dark",                  //选中的theme  
    gutters: [
        "CodeMirror-linenumbers",
        "CodeMirror-foldgutter",
        "CodeMirror-lint-markers"
    ],               //选中的theme  
}
const TaskOperation = (props: IProp) => {
    const _dbconnectionservice: IDbConnectionService = useHookProvider(IocTypes.DbConnectionService);
    const [itemlist, setSelectListItem] = useState<Array<ISelectListItem>>([]);
    const [taskType, setTaskType] = useState<TaskTypeEnum>(TaskTypeEnum.JsonToDatabase)
    /**
     * 
     * @param values 
     */
    const onFinish = (values: any) => {
        // console.log(values);
    };
    const [basicFormData] = Form.useForm();
    const [dbinputFormData] = Form.useForm();
    const [jsoninputFormData] = Form.useForm();
    useEffect(() => {
        basicFormData.setFieldsValue(initbasicformData)
        getSelectlist();
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
            title: '数据解析代码',
        },
        {
            title: '数据目标设置',
        },

    ];
    const getSelectlist = async () => {
        let result = await _dbconnectionservice.getselectlistitem();
        if (result.success) {
            setSelectListItem(result.data);
        }
    }
    const handleChange = (value: TaskTypeEnum) => {
        setTaskType(value)
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
                                    <Select onChange={handleChange}>
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
                    {//源数据设置
                        current === 1 ?
                            <div>
                                {//数据库输入设置
                                    taskType === TaskTypeEnum.DataBaseToDataBase ?
                                        <Form  {...formItemLayout} form={dbinputFormData}
                                            name="nest-messages"
                                            onFinish={onFinish}
                                            validateMessages={validateMessages}>
                                            <Form.Item
                                                name="targerId"
                                                label="来源数据连接"
                                                rules={[{ required: true }]}>
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
                                                name="sourceTable"
                                                label="源表">
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                name="sqlQuery"
                                                label="查询语句">
                                                <CodeMirror options={codeMirrorOptions}></CodeMirror>
                                            </Form.Item>
                                        </Form> : null
                                }
                                {//Json输入设置
                                    taskType === TaskTypeEnum.JsonToDatabase ?
                                        <Form  {...formItemLayout} form={jsoninputFormData}
                                            name="nest-messages"
                                            onFinish={onFinish}
                                            validateMessages={validateMessages}>
                                            <Form.Item
                                                name="jsonInputType"
                                                label="文件来源类型"
                                                rules={[{ required: true }]}>
                                                <Select defaultValue={JsonInputType.FtpDownLoad}>
                                                    {
                                                        JsonInputTypeEnumList.map((item: any) => {
                                                            return <Option key={item.type} value={item.type}>{item.label}</Option>
                                                        })
                                                    }
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                name="ftpHost"
                                                label="Ftp主机地址："
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
                                                name="sourcefilePath"
                                                label="文件来源路径："
                                                rules={[{ required: true }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                name="targetfilePath"
                                                label="文件下载路径："
                                                rules={[{ required: true }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                name="parsingCode"
                                                label="解析代码">
                                                <CodeMirror options={codeMirrorOptions}></CodeMirror>
                                            </Form.Item>
                                        </Form> : null
                                }
                            </div> : null
                    }
                    {
                        current ===2 ? 
                        <Form  {...formItemLayout}
                            name="nest-messages"
                            onFinish={onFinish}
                            validateMessages={validateMessages}>
                            <Form.Item
                                name="parsingCode"
                                label="解析代码">
                                <CodeMirror options={codeMirrorOptions}></CodeMirror>
                            </Form.Item>
                        </Form> : null
                    }
                    {// 目标配置
                        current === 3 ?
                            <div>
                                { // Json文件导入到数据库
                                    taskType === TaskTypeEnum.JsonToDatabase ?
                                        <Form  {...formItemLayout}
                                            name="nest-messages"
                                            onFinish={onFinish}
                                            validateMessages={validateMessages}>
                                            <Form.Item
                                                name="targerId"
                                                label="目标数据连接"
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
                                                name="sourceTable"
                                                label="源表">
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                name="sqlQuery"
                                                label="查询语句">
                                                <CodeMirror options={codeMirrorOptions}></CodeMirror>
                                            </Form.Item>
                                        </Form> : null
                                }
                                {
                                    taskType === TaskTypeEnum.DataBaseToDataBase ?
                                        <Form  {...formItemLayout}
                                            name="nest-messages"
                                            onFinish={onFinish}
                                            validateMessages={validateMessages}>
                                            <Form.Item
                                                name="targerId"
                                                label="目标数据连接"
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
                                                name="sourceTable"
                                                label="源表">
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                name="sqlQuery"
                                                label="查询语句">
                                                <CodeMirror options={codeMirrorOptions}></CodeMirror>
                                            </Form.Item>
                                        </Form> : null
                                }
                            </div> : null
                    }
                </div>
            </Modal>
        </div >
    );
};
export default TaskOperation;
