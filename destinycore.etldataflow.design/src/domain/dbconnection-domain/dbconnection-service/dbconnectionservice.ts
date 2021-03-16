import { ISelectListItem, IServerPageReturn, IServerReturn } from "../../../shard/ajax/response"

import BaseService from "../../baseservice/baseservice"
import { DBConnResourceInputDto } from "../dbconnection-entitie/dbconnResourceentities"
import {DbconnApi} from "../../apiconfig/index"
import IDbConnectionService from "./idbconnectionservice"
import { TreeDto } from "@/shard/entity/treedto"

export default class DbConnectionService extends BaseService implements IDbConnectionService {
    getmetadata(): Promise<IServerReturn<Array<TreeDto>>> {
        return this.dataRequest.getRequest(DbconnApi.getmetadataasync,)
    }
    getselectlistitem(): Promise<IServerReturn<Array<ISelectListItem>>> {
        return this.dataRequest.getRequest(DbconnApi.selectlistitemasync);
    }
    getPage(): Promise<IServerPageReturn<any>> {
        
        return this.dataRequest.postRequest(DbconnApi.getpage,{})
    }
    create(_param:DBConnResourceInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(DbconnApi.createasync,_param)
    }
}