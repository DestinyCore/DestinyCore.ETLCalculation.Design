import { IOperationConfig } from "../../../shard/operation/operationConfig"
import { Modal } from "antd"
import React from 'react'

interface IProp{
    Config:IOperationConfig
}
const DbconnectionOperation = (props: IProp) => {
    // const { itemId, title, visible } = props;
    return (
        <div>
            <Modal title={props.Config.title} visible={props.Config.visible} >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default DbconnectionOperation
