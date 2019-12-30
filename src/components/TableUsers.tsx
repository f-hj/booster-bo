import React from "react";
import { User } from "booster-js-client";
import SpanId from "./SpanId";
import { Link } from "react-router-dom";
import { Table } from "antd";

interface TableUsersProps {
  users?: User[]
  loading?: boolean
  light?: boolean
}

export default class TableUsers extends React.Component<TableUsersProps> {
  private columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (_: any, user: User) => {
        return (
          <SpanId object={user} />
        )
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, user: User) => {
        return (
          <span>
            <Link to={`/admin/users/${user.id}`}>Edit</Link>
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
        dataSource={this.props.users}
        showHeader={!this.props.light}
        pagination={this.props.light ? false : undefined}
      />
    )
  }
}