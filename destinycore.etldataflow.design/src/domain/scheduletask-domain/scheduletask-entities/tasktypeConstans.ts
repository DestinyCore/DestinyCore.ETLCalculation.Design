import { TaskInputTypeEnum, TaskTypeEnum } from './tasktype-enum'

/**
 * 任务类型数组
 */
export const TaskTypeEnumList: Array<any> = [
    {
        label: "输入",
        value: TaskTypeEnum.input,
        children: [
            {
                value: TaskInputTypeEnum.dataBase,
                label: "数据表输入",
            },
            {
                value: TaskInputTypeEnum.ftpjson,
                label: "Ftp-Json输入",
            },
            {
                value: TaskInputTypeEnum.excel,
                label: "Excel输入",
            }
        ]
    }
]