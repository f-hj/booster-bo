import React from "react";
import { Layout, Menu, Breadcrumb, Icon, Form, Typography, Input, Button, notification, Table } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import Store from "../../module/Store";
import { Brand, Product } from "booster-js-client";
import { Link, RouteComponentProps } from "react-router-dom";
import SpanId from "../../components/SpanId";
import TableBrands from "../../components/TableBrands";
import store from "../../module/Store";
import { observer } from "mobx-react";
import queryString from 'query-string'
import GridProducts from "./GridProducts";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface ListProductsPageProps extends RouteComponentProps<any> {}
interface ListProductsPageState {
  loading: boolean
  products?: Product[]
  brandId?: string
}

@observer
export default class ListProductsPage extends React.Component<ListProductsPageProps, ListProductsPageState> {
  public state: ListProductsPageState = {
    loading: true
  }

  public fetchProducts () {
    this.setState({ loading: true })
    const brandId: string = queryString.parse(this.props.location.search).brand as string
    if (!brandId) {
      return
    }
    Store.api.products.listBrandProducts(brandId)
      .then(res => {
        this.setState({ products: res.data.products })
      })
      .catch(err => {
        notification.error({
          message: err.response.data.errors
        })
      })
      .finally(() => {
        this.setState({
          loading: false,
          brandId: brandId,
        })
      })
  }

  public componentWillMount() {
    if (!this.state.products) {
      this.fetchProducts()
    }
  }

  public render () {
    return (
      <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Typography.Text type="secondary">
              List current products
            </Typography.Text>
            <div style={{marginTop: '2em'}} />
            <Button
              type="primary"
              onClick={() => {
                this.props.history.push(`/brand/products/add?brand=${this.state.brandId}`)
              }}
            >
              <Icon type="plus" />Add a product
            </Button>

            <br /><br /><br />
            <GridProducts {...this.props} products={this.state.products} />
            
          </div>
        </Content>
    )
  }
}
