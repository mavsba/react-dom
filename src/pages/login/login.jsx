import React, {Component} from 'react';
import {Input,Icon,Button,Form} from 'antd'
import PropTypoes from 'prop-types'



import {reqLogin,reqAddUser} from '../../api'
import './index.less'
import Logo from '../../assets/images/logo.png'
import Memory from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'



const Item = Form.Item

export default class Login extends Component {
  state ={
    errorMsg:''
  }

  sendReq = async(values) =>{
    const response =  await reqLogin(values)
    if(response.status===0){

      storageUtils.saveUser(response.data);
      Memory.user= response.data;
      this.props.history.push('/')
    }else if(response.status===1){
      this.setState({
        errorMsg:response.msg
      })
    }
  }

  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={Logo} alt="logo"/>尚硅谷后台项目
        </header>
        <div className="login-content">
          <div className="login-box">
              <div className="error-msg-wrap">
                <div className={this.state.errorMsg ? "show" : ""}>
                  {this.state.errorMsg}
                </div>
              </div>
            <div className="title">登陆页面</div>
            <Myform sendReq={this.sendReq}/>
          </div>
        </div>
      </div>
    )
  }
}



class Myform extends Component {
  static propTypes ={
    sendReq:PropTypoes.func
  }

  verify = (rule, value, callback) => {
    const uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    if (!value) {
      callback('请填写用户名')
    } else if (!uPattern.test(value)) {
      callback('用户名正则，4到16位（字母，数字，下划线，减号）')
    } else {
      callback()
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.sendReq(values)
      }
    });
  }
    render()
    {
      const {getFieldDecorator} = this.props.form;
      return (
        <Form className="login-form">
          <Item>
            {getFieldDecorator('username', {
              initialValue: 'admin',
              rules: [
                {validator: this.verify}
              ]
            })(
              <Input prefix={<Icon type="user"/>} placeholder="Username"/>
            )}
          </Item>
          <Item>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your Password!',pattern:/^[a-zA-Z0-9]{4,10}$/,message:'密码不能含有非法字符，长度在4-10之间'}],
            })(
              <Input prefix={<Icon type="lock"/>} type="password" placeholder="Password"/>
            )}
          </Item>
          <Item>
            <Button className='login-form-button' type="primary" onClick={this.handleSubmit}>登陆</Button>
          </Item>
        </Form>
      )
    }
  }


Myform = Form.create()(Myform);
