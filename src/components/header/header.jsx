import React, {Component} from 'react'
import {Row,Col,Modal} from 'antd'
import {withRouter} from 'react-router-dom'

import menuList from '../../config/menuConfig'
import Memory from '../../utils/memoryUtils'
import Storage from '../../utils/storageUtils'
import {formateDate} from '../../utils/utils'
import {reqWeather} from '../../api/index'
import './header.less'


/*
头部组件
 */
 class Header extends Component {
  state = {
    time:Date.now(),
    dayPictureUrl:'',
    weather:''
  }

  sysTime = () =>{
    this.Interval = setInterval(()=>{
      this.setState({
        time:formateDate(Date.now())
      })
    },1000)
  }

  weather = async () =>{
   const {dayPictureUrl,weather} = await reqWeather('北京')
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  exit = () => {
    Modal.confirm({
      title: '你确定要注销用户么？',
      onOk:()=> {
        Memory.user={}
        Storage.removeUser()
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }

   getTitle = (path) => {
    // console.log("path",path);
     let title
     menuList.forEach(menu => {
       if(menu.key===path) {
         title = menu.title
       } else if (menu.children) {
         menu.children.forEach(item => {
           // console.log("key",item.key);
           if(path.indexOf(item.key)===0) {
             title = item.title
           }
         })
       }
     })
     return title
   }

  componentDidMount(){

    this.sysTime()
    this.weather()

  }

  componentWillUnmount(){
   clearInterval(this.Interval)
  }


  render() {
    const{time,dayPictureUrl,weather} = this.state
    const {username} =Memory.user
    const path = this.props.location.pathname

    const  title = this.getTitle(path)

    return (
      <div className="header">
        <Row className='header-top'>
         <span>欢迎: {username}</span>
          <a href="javascript:" onClick={this.exit}>退出</a>
        </Row>
        <Row className='breadcrumb'>
          <Col  className='breadcrumb-title' span={4}>{title}</Col>
          <Col  className='weather' span={20}>
            <span className="date">{time}</span>
            <span className="weather-img">
              <img src={dayPictureUrl} alt="现在还没有等一会"/>
            </span>
            <span className="weather-detail">{weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}
export default withRouter(Header)