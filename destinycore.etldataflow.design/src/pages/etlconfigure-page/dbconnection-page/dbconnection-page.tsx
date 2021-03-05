/* eslint-disable react-hooks/exhaustive-deps */

import { PaginationProps, Table, message } from 'antd';
import React, { useEffect, useState } from 'react'

import IDbConnectionService from '@/domain/dbconnection-domain/dbconnection-service/idbconnectionservice';
import { IocTypes } from '@/shard/inversionofcontrol/ioc-config-types';
import {initPaginationConfig} from "@/shard/ajax/request"
import useHookProvider from "@/shard/dependencyInjection/ioc-hook-provider"

const Dbconnectionpage = () => {
  const _dbconnectionservice: IDbConnectionService = useHookProvider(IocTypes.DbConnectionService);
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState<PaginationProps>(initPaginationConfig);
  const columns = [

    {
      title: '链接名称',
      dataIndex: 'connectionName',
      key: "connectionName"
    },
    {
      title: '密码',
      dataIndex: 'passWord',
      key: "passWord"
    },
    {
      title: '主机',
      dataIndex: 'host',
      key: "host"
    },
  ];
  useEffect(() => {
    getTable();
  }, [pagination])
  const getTable = async () => {
    try {
      _dbconnectionservice.getPage().then(x => {
        if (x.success) {
          setPagination((Pagination)=>{
            Pagination.total=x.total;
            return Pagination;
          })
          x.data.map((item: any, index: number) => {
            item.key = item.id;
            return item;
          })
          setTableData(x.data)
        }
      });

    } catch (error) {
      message.error(error)
    }
  }
  return (
    <div>
      <Table bordered columns={columns} dataSource={tableData} pagination={pagination}/>
    </div>
  )
}

export default Dbconnectionpage
