// import ApplicationUserManager from '@/shared/ids4/identityServerLogin';

import React from 'react';

class Login extends React.Component<{ history: any }> {
  componentWillMount() {
    // ApplicationUserManager.Login();
    console.log(123456)
    localStorage.setItem("token","1234566");
    this.props.history.push("/home");
      this.setState({
        loading: false
      })
      this.props.history.go();
  }
  render() {
    return (
      <div>登录dadas页面</div>
    )
  }
}
export default Login;