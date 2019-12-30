import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Typography, notification, Skeleton, Button, Timeline } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { Brand, Log, User } from 'booster-js-client';
import store from '../../module/Store';
import ModalAddUser from '../../components/ModalAddUser';
import TableUsers from '../../components/TableUsers';
import LogItem from '../../components/LogTimeline';
import LogTimeline from '../../components/LogTimeline';
import TableBrands from '../../components/TableBrands';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface UserInfoPageProps extends RouteComponentProps<any> {}

interface UserInfoPageState {
  loading: boolean
  user?: User
  logs?: Log[]

  modalAddUser: boolean
  addUserLoading: boolean
}

export default class UserInfoPage extends React.Component<UserInfoPageProps, UserInfoPageState> {
  public state: UserInfoPageState = {
    loading: true,
    modalAddUser: false,
    addUserLoading: false,
  }

  async componentWillMount () {
    store.api.users.getUser(this.props.match.params.userId)
      .then(res => {
        this.setState({
          user: res.data.user,
          logs: res.data.logs,
        })
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

  render () {
    if (this.state.loading) {
      return (
        <div>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>User info</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Skeleton active />
            </div>
          </Content>
        </div>
      )
    }

    return (
      <div>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>User info</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, marginBottom: 12, background: '#fff' }}>
            <Typography.Title editable={true}>{this.state.user?.name}</Typography.Title>
          </div>
          <div style={{ padding: 24, marginBottom: 12, background: '#fff' }}>
            <Typography.Title level={4}>Brands</Typography.Title>
            <TableBrands
              {...this.props}
              light={true}
              loading={this.state.loading}
              brands={this.state.user?.brands}
            />
            <p></p>
          </div>
          <div style={{ padding: 24, marginBottom: 12, background: '#fff' }}>
            <Typography.Title level={4}>Timeline</Typography.Title>
            <LogTimeline logs={this.state.logs} />
          </div>

          {
            store.currentUser?.isAdmin ? 
              <div style={{ padding: 24, marginBottom: 12, background: '#fff' }}>
                <Typography.Title level={3}>Admin debug</Typography.Title>
                <Typography.Title level={4}>User</Typography.Title>
                <pre>
                  {JSON.stringify(this.state.user, null, 2)}
                </pre>

                <Typography.Title level={4}>Logs</Typography.Title>
                <pre>
                  {JSON.stringify(this.state.logs, null, 2)}
                </pre>
              </div>
            : null
          }
        </Content>

      </div>
    )
  }
}