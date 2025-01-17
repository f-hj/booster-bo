import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Typography, notification, Skeleton, Button, Timeline, Card, Row, Col } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { Product, Log } from 'booster-js-client';
import store from '../../module/Store';
import ModalAddImage from '../../components/ModalAddImage';
import TableUsers from '../../components/TableUsers';
import LogItem from '../../components/LogTimeline';
import LogTimeline from '../../components/LogTimeline';
import queryString from 'query-string'
import SpanId from '../../components/SpanId';
import ImageProduct from '../../components/ImageProduct';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface ProductInfoPageProps extends RouteComponentProps<any> {}

interface ProductInfoPageState {
  loading: boolean
  product?: Product
  logs?: Log[]

  modalAddImage: boolean
}

export default class ProductInfoPage extends React.Component<ProductInfoPageProps, ProductInfoPageState> {
  public state: ProductInfoPageState = {
    loading: true,
    modalAddImage: false,
  }

  async componentWillMount () {
    const productId: string = queryString.parse(this.props.location.search).product as string
    if (!productId) {
      return
    }
    store.api.products.getProductLogs(productId)
      .then(res => {
        this.setState({
          product: res.data.product,
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
              <Breadcrumb.Item>Products</Breadcrumb.Item>
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
            <Breadcrumb.Item>Products</Breadcrumb.Item>
            <Breadcrumb.Item>{this.state.product?.name}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, marginBottom: 12, background: '#fff' }}>
            <Typography.Title editable={true}>{this.state.product?.name}</Typography.Title>
            <Typography.Paragraph editable={true}>{this.state.product?.description}</Typography.Paragraph>
          </div>
          <div style={{ padding: 24, marginBottom: 12, background: '#fff' }}>
            <Typography.Title level={4}>Images</Typography.Title>
            <Row gutter={[16, 16]}>
            {
              this.state.product?.images?.map((img) => {
                return (
                  <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 10 }} xxl={{ span: 4}}>
                    <ImageProduct image={img} />
                  </Col>
                )
              })
            }
            </Row>
            <p></p>
            <Button
              type="primary"
              onClick={() => {
                this.setState({ modalAddImage: true })
              }}
            >
              <Icon type="plus" />Add an image
            </Button>
          </div>
          <div style={{ padding: 24, marginBottom: 12, background: '#fff' }}>
            <Typography.Title level={4}>Models</Typography.Title>
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
                <Typography.Title level={4}>Product</Typography.Title>
                <pre>
                  {JSON.stringify(this.state.product, null, 2)}
                </pre>

                <Typography.Title level={4}>Logs</Typography.Title>
                <pre>
                  {JSON.stringify(this.state.logs, null, 2)}
                </pre>
              </div>
            : null
          }
        </Content>

        <ModalAddImage
          visible={this.state.modalAddImage}
          onSubmit={() => {
            this.setState({ modalAddImage: false })
          }}
          onCancel={() => this.setState({ modalAddImage: false })}
          product={this.state.product!}
        />
      </div>
    )
  }
}