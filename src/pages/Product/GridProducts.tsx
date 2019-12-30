import React from "react";
import { Product } from "booster-js-client";
import { Row, Col, Card, Skeleton } from "antd";
import CardProduct from "../../components/CardProduct";
import { RouteComponentProps } from "react-router";

interface GridProductsProps extends RouteComponentProps<any> {
  products?: Product[]
  loading?: boolean
}

export default class GridProducts extends React.Component<GridProductsProps> {
  render () {
    if (!this.props.products || this.props.loading) {
      return (
        <Row gutter={16}>
          <Col span={8}>
            <Card
              style={{ width: 300, marginTop: 16 }}
              actions={[
              ]}
            >
              <Skeleton active />
            </Card>
          </Col>
        </Row>
      )
    }
    return (
      <Row gutter={16}>
        <Col span={8}>
          {
            this.props.products.map(product => {
              return (
                <CardProduct {...this.props} product={product} />
              )
            })
          }
        </Col>
      </Row>
    )
  }
}