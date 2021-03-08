import { Button, Row } from "antd";
import { useMemo, useState } from "react";

import { Guid } from "guid-typescript";
import { IOperationConfig } from "../../../shard/operation/operationConfig"
import TaskOperation from "./task-operation"

const TaskPage = () => {
    const [OperationState, setOperationState] = useState<IOperationConfig>({
        itemId: Guid.EMPTY,
        title: "",
        visible: false
    })
    const renderOperation = useMemo(() => {
        return (<TaskOperation Config={OperationState}></TaskOperation>)
    }, [OperationState])





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
