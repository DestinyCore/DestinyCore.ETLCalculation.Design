import { IServerPageReturn } from "../../../shard/ajax/response";

export default interface IDbConnectionService {
    getPage():Promise<IServerPageReturn<any>>;
}