import { IEntity } from "../../../shard/entity/ibaseentity"

export class DBConnResourceBase implements IEntity<string> {
    id: string = "";
    host:string ="";
    connectionName:string ="";
    port:number =0;
    userName:string ="";
    passWord:string ="";
    dbType:string ="";
    maxConnSize:number =0;
    memo:string ="";
}
export class DBConnResourceInputDto implements IEntity<string> {
    id: string = "";
    host:string ="";
    connectionName:string ="";
    port:number =0;
    userName:string ="";
    passWord:string ="";
    dbType:string ="MySql";
    maxConnSize:number =0;
    memo:string ="";
}