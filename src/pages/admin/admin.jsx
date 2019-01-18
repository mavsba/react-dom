import React, {Component} from 'react';
import {Redirect,Switch,Route,withRouter} from 'react-router-dom'
import {Row,Col} from 'antd'

import './admin.less'
import Memory from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav/left-nav'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'

import Category from '../list/category/category'
import Bar from '../list/charts/bar'
import Line from '../list/charts/line'
import Pie from '../list/charts/pie'
import Home from '../list/home/home'
import Product from '../list/product/product'
import Role from '../list/role/role'
import User from '../list/user/user'

export default class Admin extends Component {
  render() {
    const user = Memory.user
      if(!user || !user._id) {
        return <Redirect to='/login'/>
      }
    return (
      <Row className="container">
        <Col span={4}>
          <LeftNav/>
        </Col>
        <Col span={20} className="main">
            <Header/>
          <div className="content">
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to='/home'/>
            </Switch>
          </div>

          <Footer/>
        </Col>
      </Row>
    )
  }
}



