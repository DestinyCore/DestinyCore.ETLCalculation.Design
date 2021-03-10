import { Button, Row } from "antd";
import { useEffect, useMemo, useState } from "react";

import { Guid } from "guid-typescript";
import IDbConnectionService from "@/domain/dbconnection-domain/dbconnection-service/idbconnectionservice";
import { IOperationConfig } from "../../../shard/operation/operationConfig"
import { ISelectListItem } from "@/shard/ajax/response";
import { IocTypes } from "@/shard/inversionofcontrol/ioc-config-types";
import TaskOperation from "./task-operation"
import useHookProvider from "@/shard/dependencyInjection/ioc-hook-provider";

const TaskPage = () => {
    const [OperationState, setOperationState] = useState<IOperationConfig>({
        itemId: Guid.EMPTY,
        title: "",
        visible: false
    })
    useEffect(() => {
    }, [OperationState])
    const _dbconnectionservice: IDbConnectionService = useHookProvider(IocTypes.DbConnectionService);
    const renderOperation = useMemo(() => {
        return (<TaskOperation Config={OperationState}></TaskOperation>)
    }, [OperationState])
    /**
     * 对象定义
     */
    const [itemlist, setSelectListItem] = useState<Array<ISelectListItem>>([]);
    /**
   * 按钮事件
   */
    const onButtonClick = () => {
        setOperationState({
            itemId: Guid.EMPTY,
            title: "",
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
    return (
        <div>
            <Row>
                <Button type="primary" onClick={() => onButtonClick()}>添加</Button>
            </Row>
            {renderOperation}
        </div>
    );
};

export default TaskPage;
