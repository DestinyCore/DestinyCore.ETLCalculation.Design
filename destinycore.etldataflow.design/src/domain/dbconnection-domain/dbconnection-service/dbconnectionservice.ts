import BaseService from "../../baseservice/baseservice"
import {DbconnApi} from "../../apiconfig/index"
import IDbConnectionService from "./idbconnectionservice"
import { IServerReturn } from "../../../shard/ajax/response"

export default class DbConnectionService extends BaseService implements IDbConnectionService {
    getPage(): Promise<IServerReturn<any>> {
        
        return this.dataRequest.postRequest(DbconnApi.getpage,{})
    }
    
}