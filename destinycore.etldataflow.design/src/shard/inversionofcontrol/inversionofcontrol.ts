import { Container } from "inversify";
import { IocTypes } from "./ioc-config-types"

const container = new Container();
console.log(IocTypes.MenuService)
export default container;