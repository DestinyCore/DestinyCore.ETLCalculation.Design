import { ISelectListItem, IServerPageReturn, IServerReturn } from "../../../shard/ajax/response"

import BaseService from "../../baseservice/baseservice"
import IScheduleTaskService from "./ischeduletask-service"
import {ScheduletTaskInputDto} from "../scheduletask-entities/scheduleTaskentitie"

export default class ScheduleTaskService extends BaseService implements IScheduleTaskService{
    create(_param:ScheduletTaskInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest("",_param)
    }
}