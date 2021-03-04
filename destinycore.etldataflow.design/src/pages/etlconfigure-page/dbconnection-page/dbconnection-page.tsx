import React, { useEffect, useState } from 'react'
import { Table, message } from 'antd';

import IDbConnectionService from '@/domain/dbconnection-domain/dbconnection-service/idbconnectionservice';
import { IocTypes } from '@/shard/inversionofcontrol/ioc-config-types';
import useHookProvider from "@/shard/dependencyInjection/ioc-hook-provider"

const Dbconnectionpage = () => {
  const _dbconnectionservice: IDbConnectionService = useHookProvider(IocTypes.DbConnectionService);
  const [tabledata, settableData] = useState<Array<any>>([]);
  const columns = [
    
    {
      title: 'Name',
      dataIndex: 'connectionName',
    },
    {
      title: 'Age',
      dataIndex: 'passWord',
    },
    {
      title: 'Address',
      dataIndex: 'host',
    },
  ];
  useEffect( () => {
    getTable();
    // debugger
    console.log(1+1)
  })
  const getTable= async () => {
    try {
      debugger
      const res =await _dbconnectionservice.getPage();
      if(res.success)
      {
        // debugger
        settableData(res.data)
      }
    } catch (error) {
      message.error(error)
    }
  }
  return (
    <div>
      <Table bordered columns={columns} dataSource={tabledata} />;
    </div>
  )
}

export default Dbconnectionpage
