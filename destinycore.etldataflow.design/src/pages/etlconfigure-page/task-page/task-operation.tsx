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
import React, { useEffect, useMemo, useState, useRef } from "react";
import { ftpConfigDto, ReadJsonConfig, JsonReadConfigInputDto } from "@/domain/scheduletask-domain/scheduletask-entities/input-entities/json-input"
import CodeMirror from 'react-codemirror';
import IDbConnectionService from "@/domain/dbconnection-domain/dbconnection-service/idbconnectionservice";
import { IOperationConfig } from "../../../shard/operation/operationConfig"
import { ISelectListItem } from "@/shard/ajax/response";
import { IocTypes } from "@/shard/inversionofcontrol/ioc-config-types";
import JsonForm from "./input-form/json-form"
import TaskGeneralConfig from "./task-general-config"
import { ScheduletTaskInputDto } from "@/domain/scheduletask-domain/scheduletask-entities/scheduleTaskentitie"
import { TaskTypeEnum } from "@/domain/scheduletask-domain/scheduletask-entities/tasktype-enum"
import { TaskTypeEnumList } from "@/domain/scheduletask-domain/scheduletask-entities/tasktypeConstans"
import useHookProvider from "@/shard/dependencyInjection/ioc-hook-provider";
import IScheduleTaskService from "@/domain/scheduletask-domain/scheduletask-services/ischeduletask-service";
import { Guid } from "guid-typescript";
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

interface IProp {
    Config: IOperationConfig;
    taskType: TaskTypeEnum;
}
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
const { Step } = Steps;
const TaskOperation = (props: IProp) => {
    /**
     * 
     */
    const _dbconnectionservice: IDbConnectionService = useHookProvider(IocTypes.DbConnectionService);
    const _scheduletaskservice: IScheduleTaskService=useHookProvider(IocTypes.ScheduleTaskService);
    /**
     * 任务基础配置
     */
    const [taskbasicState, settaskbasicState] = useState<ScheduletTaskInputDto>(new ScheduletTaskInputDto())
    /**
     * Json文件读取配置
     */
    const [ReadJsonConfigState, setReadJsonConfigState] = useState<ReadJsonConfig>(new ReadJsonConfig());
    const [itemlist, setSelectListItem] = useState<Array<ISelectListItem>>([]);
    /**
     * 步骤条
     */
    const [current, setCurrent] = React.useState(0);
    /**
     * 步骤条数组
     */
    const steps = [
        {
            title: '基础信息',
        },
        {
            title: '数据来源设置',
        }
    ];
    /**
     * 读取Json文件的Ref
     */
    const jsoninputRef = React.createRef<any>();
    /**
     * 任务基础配置Ref
     */
    const taskbasicinputRef = React.createRef<any>();
    /**
     * 点击下一步
     */
    const next = () => {
        taskbasicinputRef.current.getSonformValues();
        setCurrent(current + 1);
    };
    useEffect(() => {
    }, [ReadJsonConfigState, taskbasicState]);
    /**
     * 点击上一步
     */
    const prev = () => {
        setCurrent(current - 1);
    };
    const getSelectlist = async () => {
        let result = await _dbconnectionservice.getselectlistitem();
        if (result.success) {
            setSelectListItem(result.data);
        }
    }
    const onSave = () => {
        jsoninputRef.current.getSonformValues()
    }
    const getjsonFormFiledValue = (readJsonConfig: ReadJsonConfig) => {
        const { taskName, taskNumber,describe } = taskbasicState;
        const param={
            id:Guid.EMPTY.toString(),
            taskName:taskName,
            taskNumber:taskNumber,
            taskType:props.taskType,
            describe:describe,
            taskConfig:JSON.stringify(readJsonConfig)
        }
        _scheduletaskservice.create(param)
    }
    /**
     * 
     * @param value 获取Json文件的配置
     */
    const gettaskbasicFormFiledValue = (taskbasic: any) => {
        settaskbasicState(taskbasic)
    }
    /**
     * 关闭弹框
     */
    const onCancel = () => {
        if (props.Config.onClose) {
            props.Config.onClose();
        }
    };
    return (
        <div>
            <Modal getContainer={false} width={1000} title={props.Config.title} closable={false} visible={props.Config.visible}
                footer={[
                    <div key="foot" className="steps-action">
                        <Button key="cancel" style={{ margin: '0 8px' }} onClick={() => onCancel()}>取消</Button>
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
                            <Button key="finesh" type="primary" onClick={() => onSave()}>保存</Button>
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
                {
                    current < steps.length - 1 ?
                        <TaskGeneralConfig taskbasicData={taskbasicState} onGetFormFiled={gettaskbasicFormFiledValue} onRef={taskbasicinputRef}></TaskGeneralConfig>
                        : null

                }
                {
                    props.taskType === TaskTypeEnum.ftpjson && current === steps.length - 1 ?
                        <JsonForm ReadJsonConfigData={ReadJsonConfigState} onGetFormFiled={getjsonFormFiledValue} onRef={jsoninputRef}></JsonForm>
                        : null
                }
            </Modal>
        </div >
    );
};
export default TaskOperation;
