import React from "react";
import { Layout, Menu, Breadcrumb, Icon, Form, Typography, Input, Button, notification, Table } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import Store from "../../module/Store";
import { Brand } from "booster-js-client";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface ListBrandsAdminPageProps {}
interface ListBrandsAdminPageState {
  loading: boolean
  brands?: Brand[]
}


export default class ListBrandsAdminPage extends React.Component<ListBrandsAdminPageProps, ListBrandsAdminPageState> {
  public state: ListBrandsAdminPageState = {
    loading: true
  }

  public fetchBrands () {
    this.setState({ loading: true })
    Store.api.brands.listBrands()
      .then(res => {
        this.setState({ brands: res.data.brands })
      })
      .catch(err => {
        notification.error({
          message: err.response.data.errors
        })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  private columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Users',
      dataIndex: 'users',
      key: 'users',
    },
    {
      title: 'Verified',
      dataIndex: 'verified',
      key: 'verified',
      render: (_: any, brand: Brand) => {
        return (
          <Icon type="close-circle" theme="twoTone" twoToneColor="#ff0000" />
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, brand: Brand) => {
        return (
          <span>
            <Link to={`/brand/info/${brand.id}`}>Edit</Link>
          </span>
        )
      }
    }
  ]

  public componentWillMount() {
    if (!this.state.brands) {
      this.fetchBrands()
    }
  }

  public render () {
    return (
      <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>List brands</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Typography.Text type="secondary">
              List current brands
            </Typography.Text>
            <div style={{marginTop: '2em'}} />

            <Table
              loading={this.state.loading}
              columns={this.columns}
              dataSource={this.state.brands}
            />
            
          </div>
        </Content>
    )
  }
}
