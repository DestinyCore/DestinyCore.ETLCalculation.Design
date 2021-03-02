import { IServerReturn } from "../../../shard/ajax/response";

export default interface IDbConnectionService {
    getPage():Promise<IServerReturn<any>>;
}