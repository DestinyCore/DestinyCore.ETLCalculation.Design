import React, { useEffect } from 'react'
import { Table, message } from 'antd';

import IDbConnectionService from '@/domain/dbconnection-domain/dbconnection-service/idbconnectionservice';
import { IocTypes } from '@/shard/inversionofcontrol/ioc-config-types';
import useHookProvider from "@/shard/dependencyInjection/ioc-hook-provider"

const Dbconnectionpage = () => {
  const _dbconnectionservice: IDbConnectionService = useHookProvider(IocTypes.DbConnectionService);
  useEffect(() => {

  })
  const getTable= async () => {
    try {
      const res =await _dbconnectionservice.getPage();
      if(!res.success)
      {
        
      }
    } catch (error) {
      message.error(error)
    }
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32 + i,
      address: `London, Park Lane no. ${i}`,
    });
  }
  return (
    <div>
      <Table bordered columns={columns} dataSource={data} />;
    </div>
  )
}

export default Dbconnectionpage
