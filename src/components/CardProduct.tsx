import { Product } from "booster-js-client";
import React from "react";
import { Card, Icon } from "antd";
import SpanId from "./SpanId";
import { RouteComponentProps } from "react-router";

interface CardProductProps extends RouteComponentProps<any> {
  product: Product
}

export default class CardProduct extends React.Component<CardProductProps> {
  render () {
    return (
      <Card
        hoverable
        style={{ width: 240 }}
        onClick={() => {
          this.props.history.push(`/brand/products/product?product=${this.props.product.id}`)
        }}
      >
        <Card.Meta title={this.props.product.name} description={this.props.product.description} />
        <br /><br />
        <SpanId object={this.props.product} />
      </Card>
    )
  }
}