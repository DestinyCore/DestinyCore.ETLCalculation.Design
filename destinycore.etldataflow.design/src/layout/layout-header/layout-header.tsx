import { Button, Layout } from 'antd';
import React, { Component } from 'react'

export default class Layoutheader extends Component {
    // logout = () => {
    //     localStorage.removeItem("token");
    //     ApplicationUserManager.Logout();
    // }
    render() {
        return (
            <div>
                <Layout.Header className="sukt-layout__header">
                    <Button ghost={true} type="primary" >退出登录</Button>
                </Layout.Header>
            </div>
        )
    }
}
