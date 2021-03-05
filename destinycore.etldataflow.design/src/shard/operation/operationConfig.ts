export interface IOperationConfig {
  /**
   * 选中行的唯一键
   */
  itemId: string;
  /**
   * 弹框是否显示
   */
  visible: boolean;
  /**
   * 弹框标题
   */
  title: string;
   onClose():void;
}