import { ISelectListItem, IServerPageReturn, IServerReturn } from "../../../shard/ajax/response"

import BaseService from "../../baseservice/baseservice"
import IScheduleTaskService from "./ischeduletask-service"
import {ScheduletTaskInputDto} from "../scheduletask-entities/scheduleTaskentitie"
import { ScheduleTaskApi } from "@/domain/apiconfig"

export default class ScheduleTaskService extends BaseService implements IScheduleTaskService{
    create(_param:ScheduletTaskInputDto): Promise<IServerReturn<any>> {
        debugger
        return this.dataRequest.postRequest(ScheduleTaskApi.createasync,_param)
    }
}