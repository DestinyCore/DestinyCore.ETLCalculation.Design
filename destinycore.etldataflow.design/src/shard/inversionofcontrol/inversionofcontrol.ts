import { Aantvx6GraphService } from "@/domain/antvx6-domain/antvx6graph-services/antvx6graphservice";
import { Container } from "inversify";
import DbConnectionService from "@/domain/dbconnection-domain/dbconnection-service/dbconnectionservice"
import IAntvx6GraphService from "@/domain/antvx6-domain/antvx6graph-services/iantvx6graphservice";
import IDbConnectionService from "@/domain/dbconnection-domain/dbconnection-service/idbconnectionservice"
import { IocTypes } from "./ioc-config-types"

const ioccontainer = new Container();
ioccontainer.bind<IAntvx6GraphService>(IocTypes.Aantvx6GraphService).to(Aantvx6GraphService)
ioccontainer.bind<IDbConnectionService>(IocTypes.DbConnectionService).to(DbConnectionService)
export default ioccontainer;