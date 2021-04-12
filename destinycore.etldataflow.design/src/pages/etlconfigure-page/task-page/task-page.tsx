import { Button, Cascader, Popover, Row } from "antd";
import { useEffect, useMemo, useState } from "react";

import { Guid } from "guid-typescript";
import IDbConnectionService from "@/domain/dbconnection-domain/dbconnection-service/idbconnectionservice";
import { IOperationConfig } from "../../../shard/operation/operationConfig"
import { ISelectListItem } from "@/shard/ajax/response";
import { IocTypes } from "@/shard/inversionofcontrol/ioc-config-types";
import TaskOperation from "./task-operation"
import { TaskTypeEnum } from "@/domain/scheduletask-domain/scheduletask-entities/tasktype-enum"
import { TaskTypeEnumList } from "@/domain/scheduletask-domain/scheduletask-entities/tasktypeConstans"
import useHookProvider from "@/shard/dependencyInjection/ioc-hook-provider";

const TaskPage = () => {
    const [OperationState, setOperationState] = useState<IOperationConfig>({
        itemId: Guid.EMPTY,
        title: "",
        visible: false
    })
    const [taskTypeState, settaskTypeState] = useState<TaskTypeEnum>(TaskTypeEnum.ftpjson)
    const [cascader, setCascader] = useState({ visible: false });
    useEffect(() => {
    }, [OperationState]);
    /**
     * 级联选择事件
     */
    const cascaderonChange = (value: any,selectedOptions:any) => {
        setCascader({ visible: false });
        settaskTypeState(value[value.length-1])
        setOperationState({
            itemId: Guid.EMPTY,
            title: "添加任务",
            visible: true,
            onClose: () => {
                setOperationState({
                    itemId: Guid.EMPTY,
                    title: "",
                    visible: false,
                })
            }
        })
    }
    /**
     * 气泡弹窗事件
     */
    const handleVisibleChange = (value: any) => {
        setCascader({ visible: value });
    }
    const content = (
        <div>
            <Cascader options={TaskTypeEnumList} onChange={cascaderonChange} placeholder="请选择任务类型" />,
        </div>
    );
    const _dbconnectionservice: IDbConnectionService = useHookProvider(IocTypes.DbConnectionService);
    const renderOperation = useMemo(() => {
        return (<TaskOperation Config={OperationState} taskType={taskTypeState}></TaskOperation>)
    }, [OperationState])
    /**
     * 对象定义
     */
    const [itemlist, setSelectListItem] = useState<Array<ISelectListItem>>([]);
    return (
        <div>
            <Row>

                <Popover placement="bottomLeft" visible={cascader.visible} title="任务类型" content={content} onVisibleChange={handleVisibleChange} trigger="click">
                    <Button type="primary">添加</Button>
                </Popover>

            </Row>
            {renderOperation}
        </div>
    );
};

export default TaskPage;
