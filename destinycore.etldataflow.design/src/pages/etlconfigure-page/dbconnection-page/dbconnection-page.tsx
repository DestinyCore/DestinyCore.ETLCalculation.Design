import React from 'react'
import { Table } from 'antd';

const dbconnectionpage = () => {
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
          age: 32+i,
          address: `London, Park Lane no. ${i}`,
        });
      }
    return (
        <div>
            <Table bordered columns={columns} dataSource={data} />;
        </div>
    )
}

export default dbconnectionpage
