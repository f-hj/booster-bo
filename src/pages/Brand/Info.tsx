import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Typography, notification, Skeleton, Button, Timeline } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { Brand, Log } from 'booster-js-client';
import store from '../../module/Store';
import ModalAddUser from '../../components/ModalAddUser';
import TableUsers from '../../components/TableUsers';
import LogItem from '../../components/LogTimeline';
import LogTimeline from '../../components/LogTimeline';
import queryString from 'query-string'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface BrandInfoPageProps extends RouteComponentProps<any> {}

interface BrandInfoPageState {
  loading: boolean
  brand?: Brand
  logs?: Log[]

  modalAddUser: boolean
  addUserLoading: boolean
}

export default class BrandInfoPage extends React.Component<BrandInfoPageProps, BrandInfoPageState> {
  public state: BrandInfoPageState = {
    loading: true,
    modalAddUser: false,
    addUserLoading: false,
  }

  async componentWillMount () {
    const brandId: string = queryString.parse(this.props.location.search).brand as string
    if (!brandId) {
      return
    }
    store.api.brands.getBrandLogs(brandId)
      .then(res => {
        this.setState({
          brand: res.data.brand,
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
              <Breadcrumb.Item>Brand info</Breadcrumb.Item>
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
            <Breadcrumb.Item>Brand info</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, marginBottom: 12, background: '#fff' }}>
            <Typography.Title editable={true}>{this.state.brand?.name}</Typography.Title>
          </div>
          <div style={{ padding: 24, marginBottom: 12, background: '#fff' }}>
            <Typography.Title level={4}>Users</Typography.Title>
            <TableUsers
              light={true}
              loading={this.state.loading}
              users={this.state.brand?.users}
            />
            <p></p>
            <Button
              onClick={() => this.setState({ modalAddUser: true })}
              loading={this.state.addUserLoading}
              type="primary"
            >
              <Icon type="plus" />
              Invite user
            </Button>
          </div>
          <div style={{ padding: 24, marginBottom: 12, background: '#fff' }}>
            <Typography.Title level={4}>Timeline</Typography.Title>
            <LogTimeline logs={this.state.logs} />
          </div>

          {
            store.currentUser?.isAdmin ? 
              <div style={{ padding: 24, marginBottom: 12, background: '#fff' }}>
                <Typography.Title level={3}>Admin debug</Typography.Title>
                <Typography.Title level={4}>Brand</Typography.Title>
                <pre>
                  {JSON.stringify(this.state.brand, null, 2)}
                </pre>

                <Typography.Title level={4}>Logs</Typography.Title>
                <pre>
                  {JSON.stringify(this.state.logs, null, 2)}
                </pre>
              </div>
            : null
          }
        </Content>

        <ModalAddUser
          visible={this.state.modalAddUser}
          onSubmit={(email) => {
            this.setState({
              modalAddUser: false,
              addUserLoading: true,
            })

            store.api.brands.inviteUser(this.state.brand?.id!, {
              email,
            }).then((res) => {
              this.setState({ brand: res.data.brand })
            }).catch((err) => {
              notification.error({
                message: err.response.data.errors
              })
            }).finally(() => {
              this.setState({ addUserLoading: false })
            })
          }}
          onCancel={() => this.setState({ modalAddUser: false })}
        />
      </div>
    )
  }
}