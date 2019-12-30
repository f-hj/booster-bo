import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Typography, Button } from 'antd';
import { observer } from 'mobx-react';
import store from '../module/Store';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

@observer
export default class WelcomePage extends React.Component {
  render () {
    return (
      <div>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Typography.Title>Welcome {store.user?.name}!</Typography.Title>
            <Typography.Paragraph>
              We're really happy to see you here 😀! We hope that you'll enjoy to use our awesome platform and that will help you to create some awesome
              products.
            </Typography.Paragraph>
            <Typography.Paragraph>
              You don't have any brand created yet. You should ask your manager to get an access to your brand or contact us to create one!
              This process doesn't take long, but you need to send us some of your products to control the quality of what you're capable to create.
            </Typography.Paragraph>
            <Button type="primary">Contact us</Button>
          </div>
        </Content>
      </div>
    )
  }
}