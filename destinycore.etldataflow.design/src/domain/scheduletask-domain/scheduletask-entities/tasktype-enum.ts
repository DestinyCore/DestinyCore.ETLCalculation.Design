/**
 * 任务类型
 */
export enum TaskTypeEnum {
    /**
     * 数据库导入数据库任务
     */
    DataBaseToDataBase = 0,
    /**
     * Http任务
     */
    Http = 5,
    /**
     * Excel导入数据库任务
     */
    ExcelToDataBase = 10,
    /**
     * 数据库导出Excel任务
     */
    DataBaseToExcel=15
}

export const TaskTypeEnumList: Array<any> = [
    {
        type: TaskTypeEnum.DataBaseToDataBase,
        label: "数据库导入数据库任务",
    },
    {
        type: TaskTypeEnum.Http,
        label: "Http任务",
    },
    {
        type: TaskTypeEnum.ExcelToDataBase,
        label: "Excel导入数据库任务",
    },
    {
        type: TaskTypeEnum.DataBaseToExcel,
        label: "数据库导出Excel任务",
    }
]