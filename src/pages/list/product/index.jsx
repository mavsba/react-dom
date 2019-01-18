import React, {Component} from 'react';
import {Card,Select,Icon,Input,Button,Table} from 'antd'


import {reqProducts,reqSearchProducts} from '../../../api/index'
const {Option} = Select



export default class Index extends Component {
  state ={
    products:[],
    total:0,
    searchType:'productName',
    searchValue:''
  }

  initColumns =() =>{
    this.columns = [{
      title: '商品名称',
      dataIndex: 'name',
    }, {
      title: '商品描述',
      className: 'desc',
    }, {
      title: '价格',
      dataIndex: 'price',
      render:(price) => (<span>${price}</span>)
    },
      {
        title: '状态',
        dataIndex: 'status',
        render:(status) => (
          <span>
          <Button>下架</Button>
          <span>在售</span>
        </span>
        )
      },
      {
        title: '操作 ',
        render:(price) => (<span>
        <a href="javascript:">详情</a>
          &nbsp;
          <a href="javascript:">修改</a>
      </span>)
      }
    ]
  }

  getProducts = async (pageNum,pageSize=2) => {
    const {searchType,searchValue} = this.state
      let result
      if(searchValue){  //搜索分页
         result = await reqSearchProducts(pageNum,pageSize,searchType,searchValue)

      }else{          //一般分页
         result = await reqProducts(pageNum,pageSize)


      }

    // console.log(result);
    if(result.status === 0){
      const {total,list} = result.data

      // console.log(total,list);
      this.setState({
        total,
        products:list
      })
    }
  };


  searchValue = (e) =>{

    this.setState({
      searchValue: e.target.value
    })
  }

  componentWillMount(){
    this.initColumns()
  }

  componentDidMount(){
    this.getProducts(1)
  }
  render() {
    const {products,total,searchType} = this.state
    // console.log(products);
    return (
      <div>
        <Card >
          <Select style={{width:150,float:"left"}} value={searchType} onChange={value => this.setState({searchType:value})}>
            <Option key='productName' value='productName'>按照名称搜索</Option>
            <Option key='productDesc' value='productDesc'>按照描述搜索</Option>
          </Select>
          <Input onChange={this.searchValue} placeholder="Basic usage" style={{width:150,marginLeft:20,marginRight:20}} />
          <Button type="primary"  onClick={()=>this.getProducts(1)}>搜索 </Button>
          <Button type="primary" style={{float:'right'}}><Icon type="plus" />添加产品</Button>
        </Card>
        <Table
          bordered
          rowKey='_id'
          columns={this.columns}
          dataSource={products}
          pagination={
            {
            defaultPageSize: 2,
            total,
            showQuickJumper:true,
              onChange:this.getProducts
            }
          }
        />
      </div>
    )
  }
}



