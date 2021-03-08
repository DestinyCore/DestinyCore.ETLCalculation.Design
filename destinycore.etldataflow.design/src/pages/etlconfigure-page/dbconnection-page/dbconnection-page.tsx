import { Button, PaginationProps, Row, Table, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";

import DbconnectionOperation from "./dbconnection-operation"
import { Guid } from "guid-typescript";
import IDbConnectionService from "@/domain/dbconnection-domain/dbconnection-service/idbconnectionservice";
import { IOperationConfig } from "../../../shard/operation/operationConfig"
import { IocTypes } from "@/shard/inversionofcontrol/ioc-config-types";
import { initPaginationConfig } from "@/shard/ajax/request";
import useHookProvider from "@/shard/dependencyInjection/ioc-hook-provider";
import { useMemo } from "react";

const Dbconnectionpage = () => {
  const _dbconnectionservice: IDbConnectionService = useHookProvider(
    IocTypes.DbConnectionService
  );
  const [OperationState, setOperationState] = useState<IOperationConfig>({
    itemId: Guid.EMPTY,
    title: "",
    visible: false,
  })
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState<PaginationProps>(
    initPaginationConfig
  );
  /**
   * Table 列名
   */
  const columns = [
    {
      title: "链接名称",
      dataIndex: "connectionName",
      key: "connectionName",
    },
    {
      title: "密码",
      dataIndex: "passWord",
      key: "passWord",
    },
    {
      title: "主机",
      dataIndex: "host",
      key: "host",
    },
  ];
  const renderOperation = useMemo(() => {
    return (<DbconnectionOperation Config={OperationState}></DbconnectionOperation>)
  }, [OperationState])
  /**
   * 按钮事件
   */
  const onButtonClick = () => {
    setOperationState({
      itemId: Guid.EMPTY,
      title: "添加连接",
      visible: true,
      onClose: () => {
        setOperationState({
          itemId: Guid.EMPTY,
          title: "",
          visible: false,
        })
      }
    })
  }
  /**
   * 页面初始化事件
   */
  useEffect(() => {
    getTable();
  }, [pagination]);
  /**
   * 页面初始化获取数据
   */
  const getTable = async () => {
    try {
      _dbconnectionservice.getPage().then((x) => {
        if (x.success) {
          setPagination((Pagination) => {
            Pagination.total = x.total;
            return Pagination;
          });
          x.data.map((item: any, index: number) => {
            item.key = item.id;
            return item;
          });
          setTableData(x.data);
        }
      });
    } catch (error) {
      message.error(error);
    }
  };
  return (
    <div>
      <div>
        <Row>
          <Button type="primary" onClick={() => onButtonClick()}>添加</Button>
        </Row>
      </div>
      <Table bordered columns={columns} dataSource={tableData} pagination={pagination} />
      {renderOperation}
    </div>
  );
};
export default Dbconnectionpage;
