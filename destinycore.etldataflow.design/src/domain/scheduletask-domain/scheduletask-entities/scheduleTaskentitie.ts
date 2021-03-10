import { IEntity } from "../../../shard/entity/ibaseentity"
import {TaskTypeEnum} from "./tasktype-enum"

/**
 任务管理基类
 * 
 */
export class ScheduletTaskBase implements IEntity<string> {
    id: string = "";
    taskNumber:string ="";
    taskName:string ="";
    taskType:TaskTypeEnum =TaskTypeEnum.DataBaseToDataBase;
    taskConfig:string ="";
    describe:string ="";
}
/**
 * 输入Dto
 */
export class ScheduletTaskInputDto extends ScheduletTaskBase {

}