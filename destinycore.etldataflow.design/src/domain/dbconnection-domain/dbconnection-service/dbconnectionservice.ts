import BaseService from "../../baseservice/baseservice"
import {DbconnApi} from "../../apiconfig/index"
import IDbConnectionService from "./idbconnectionservice"
import { IServerPageReturn } from "../../../shard/ajax/response"

export default class DbConnectionService extends BaseService implements IDbConnectionService {
    getPage(): Promise<IServerPageReturn<any>> {
        
        return this.dataRequest.postRequest(DbconnApi.getpage,{})
    }
    
}