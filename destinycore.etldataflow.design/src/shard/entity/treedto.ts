/**
 * 主键
 */
export class TreeDto {
    /**
    * 树形唯一值
    */
    key: string = "";
    /**
    * 名称
    */
    title: string = "";
    /**
    * 父级
    */
    parent: string = "";
    /**
    * 是否可选
    */
    disabled: boolean = false;
    /**
    * 是否可选
    */
    children: Array<TreeDto> = [];
}