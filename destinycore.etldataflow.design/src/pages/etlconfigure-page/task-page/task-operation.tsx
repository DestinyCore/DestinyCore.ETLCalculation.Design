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
import React, { useEffect, useMemo, useState } from "react";

import CodeMirror from 'react-codemirror';
import IDbConnectionService from "@/domain/dbconnection-domain/dbconnection-service/idbconnectionservice";
import { IOperationConfig } from "../../../shard/operation/operationConfig"
import { ISelectListItem } from "@/shard/ajax/response";
import { IocTypes } from "@/shard/inversionofcontrol/ioc-config-types";
import JsonForm from "./input-form/json-form"
import { ScheduletTaskInputDto } from "@/domain/scheduletask-domain/scheduletask-entities/scheduleTaskentitie"
import { TaskTypeEnum } from "@/domain/scheduletask-domain/scheduletask-entities/tasktype-enum"
import { TaskTypeEnumList } from "@/domain/scheduletask-domain/scheduletask-entities/tasktypeConstans"
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
    const [taskType, setTaskType] = useState<TaskTypeEnum>(TaskTypeEnum.input)
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
    }, []);
    const jsonForm = useMemo(() => {
        return (<JsonForm></JsonForm>)
    }, [])
    const getSelectlist = async () => {
        let result = await _dbconnectionservice.getselectlistitem();
        if (result.success) {
            setSelectListItem(result.data);
        }
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
                        <Button key="finesh" type="primary" onClick={() => message.success('Processing complete!')}>保存</Button>
                    </div>
                ]}>
                {jsonForm}
            </Modal>
        </div >
    );
};
export default TaskOperation;
