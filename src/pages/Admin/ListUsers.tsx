import React from "react";
import { Layout, Menu, Breadcrumb, Icon, Form, Typography, Input, Button, notification, Table } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import Store from "../../module/Store";
import { User } from "booster-js-client";
import { Link } from "react-router-dom";
import SpanId from "../../components/SpanId";
import TableUsers from "../../components/TableUsers";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface ListUsersAdminPageProps {}
interface ListUsersAdminPageState {
  loading: boolean
  users?: User[]
}


export default class ListUsersAdminPage extends React.Component<ListUsersAdminPageProps, ListUsersAdminPageState> {
  public state: ListUsersAdminPageState = {
    loading: true
  }

  public fetchUsers () {
    this.setState({ loading: true })
    Store.api.users.listUsers()
      .then(res => {
        this.setState({ users: res.data.users })
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
    if (!this.state.users) {
      this.fetchUsers()
    }
  }

  public render () {
    return (
      <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>List users</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Typography.Text type="secondary">
              List current users
            </Typography.Text>
            <div style={{marginTop: '2em'}} />

            <TableUsers loading={this.state.loading} users={this.state.users} />
            
          </div>
        </Content>
    )
  }
}
