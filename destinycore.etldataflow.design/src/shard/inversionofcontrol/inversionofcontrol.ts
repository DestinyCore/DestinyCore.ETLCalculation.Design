import { Aantvx6GraphService } from "@/domain/antvx6-domain/antvx6graph-services/antvx6graphservice";
import { Container } from "inversify";
import IAntvx6GraphService from "@/domain/antvx6-domain/antvx6graph-services/iantvx6graphservice";
import { IocTypes } from "./ioc-config-types"

const ioccontainer = new Container();
ioccontainer.bind<IAntvx6GraphService>(IocTypes.Aantvx6GraphService).to(Aantvx6GraphService)
export default ioccontainer;