import { ISelectListItem, IServerPageReturn, IServerReturn } from "../../../shard/ajax/response";

import { DBConnResourceInputDto } from "../dbconnection-entitie/dbconnResourceentities"

export default interface IDbConnectionService {
    /**
     * 分页获取
     */
    getPage():Promise<IServerPageReturn<any>>;
    /**
     * 创建数据连接
     * @param _param 
     */
    create(_param:DBConnResourceInputDto): Promise<IServerReturn<any>>;
    /**
     * 获取数据连接下拉框
     */
    getselectlistitem(): Promise<IServerReturn<ISelectListItem>>;
}