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
    DataBaseToExcel=15,
    /**
     * Json文件导入到数据库
     */
    JsonToDatabase=20
}
/**
 * 目标表写入前操作类型
 */
export enum TargerWriteBeforOperationType{
    /**
     * 不删除任何数据
     */
    DoNotDeleteAnyData=0,
    /**
     * 删除已有数据
     */
    DeleteExistingData=5,
    /**
     * 删除本批数据
     */
    DeleteThisBatchData=10,
    /**
     * 清空目标表数据
     */
    ClearTargetTableData=15,
    /**
     * 自定义删除语句
     */
    CustomDeleteStatement=20,
}
/**
 * 任务类型数组
 */
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
    },
    {
        type: TaskTypeEnum.JsonToDatabase,
        label: "Json文件导入到数据库",
    }
]
/**
 * Json文件来源类型
 */
 export enum JsonInputType{
    /**
     * FTP下载文件解析
     */
    FtpDownLoad=0,
}
/**
 * 任务类型数组
 */
 export const JsonInputTypeEnumList: Array<any> = [
    {
        type: JsonInputType.FtpDownLoad,
        label: "FTP下载文件解析",
    }
]