import { Modal, Tree } from "antd"

import { IOperationConfig } from "../../../shard/operation/operationConfig"
import React from 'react'
import { TreeDto } from "../../../shard/entity/treedto"

interface IProp {
    Config: IOperationConfig;
    TreeArr: Array<TreeDto>

}

const DBconnectionMetadata = (props: IProp) => {
    const onCancel = () => {
        if (props.Config.onClose) {
            props.Config.onClose();
        }
    };
    const treeChecked=(data:any,e:any)=>{
        console.log(data,e)
    }
    return (
        <div>
            <Modal width={1000} title={props.Config.title} visible={props.Config.visible}  onCancel={onCancel}>
            <Tree height={600}
                checkable
                onCheck={treeChecked}
                treeData={props.TreeArr}/>
            </Modal>
        </div>
    )
}

export default DBconnectionMetadata
