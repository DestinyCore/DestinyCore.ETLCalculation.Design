import { ISelectListItem, IServerPageReturn, IServerReturn } from "../../../shard/ajax/response"

import BaseService from "../../baseservice/baseservice"
import { DBConnResourceInputDto } from "../dbconnection-entitie/dbconnResourceentities"
import {DbconnApi} from "../../apiconfig/index"
import IDbConnectionService from "./idbconnectionservice"

export default class DbConnectionService extends BaseService implements IDbConnectionService {
    getselectlistitem(): Promise<IServerReturn<ISelectListItem>> {
        return this.dataRequest.getRequest(DbconnApi.selectlistitemasync);
    }
    getPage(): Promise<IServerPageReturn<any>> {
        
        return this.dataRequest.postRequest(DbconnApi.getpage,{})
    }
    create(_param:DBConnResourceInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(DbconnApi.createasync,_param)
    }
}