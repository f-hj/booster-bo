import React from "react";
import { Brand } from "booster-js-client";
import SpanId from "./SpanId";
import { Link, RouteComponentProps } from "react-router-dom";
import { Table, Icon } from "antd";
import store from "../module/Store";

interface TableBrandsProps extends RouteComponentProps<any> {
  brands?: Brand[]
  loading?: boolean
  light?: boolean
}

export default class TableBrands extends React.Component<TableBrandsProps> {
  private columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (_: any, brand: Brand) => {
        return (
          <SpanId object={brand} />
        )
      }
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
      render: (_: any, brand: Brand) => {
        return (
          <span>{brand.users?.length} users</span>
        )
      }
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
            <a onClick={() => {
              store.currentBrandId = brand.id
              this.props.history.push(`/brand/info?brand=${brand.id}`)
            }}>Edit</a>
          </span>
        )
      }
    }
  ]

  render () {
    return (
      <Table
        loading={this.props.loading}
        columns={this.columns}
        dataSource={this.props.brands}
        showHeader={!this.props.light}
        pagination={this.props.light ? false : undefined}
      />
    )
  }
}