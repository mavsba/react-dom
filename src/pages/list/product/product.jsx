import React, {Component} from 'react';
import {Route,Redirect,Switch} from 'react-router-dom'

import Detail from './detail'
import Index from './index'
import SaveUpData from './save-updata'
export default class Product extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/product/index' component={Index}/>
          <Route path='/product/saveupdate' component={SaveUpData}/>
          <Route path='/product/detail' component={Detail}/>
          <Redirect to='/product/index'/>
        </Switch>
      </div>
    )
  }
}



