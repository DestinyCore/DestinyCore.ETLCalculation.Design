import { ISelectListItem, IServerPageReturn, IServerReturn } from "../../../shard/ajax/response"

import {ScheduletTaskInputDto} from "../scheduletask-entities/scheduleTaskentitie"

export default interface IScheduleTaskService{
    create(_param:ScheduletTaskInputDto): Promise<IServerReturn<any>>;
}