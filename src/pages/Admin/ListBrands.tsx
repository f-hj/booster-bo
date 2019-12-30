import React from "react";
import { Layout, Menu, Breadcrumb, Icon, Form, Typography, Input, Button, notification, Table } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import Store from "../../module/Store";
import { Brand } from "booster-js-client";
import { Link, RouteComponentProps } from "react-router-dom";
import SpanId from "../../components/SpanId";
import TableBrands from "../../components/TableBrands";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface ListBrandsAdminPageProps extends RouteComponentProps<any> {}
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

            <TableBrands
              {...this.props}
              loading={this.state.loading}
              brands={this.state.brands}
            />
            
          </div>
        </Content>
    )
  }
}
