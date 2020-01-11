import { Timeline, Tooltip, Popover } from "antd";
import React from "react";
import { Log, User } from "booster-js-client";
import moment from "moment";
import UserAvatar from "./AvatarUser";
import { Link, NavLink } from "react-router-dom";

interface LogTimelineProps {
  logs?: Log[]
  full?: boolean
}

export default class LogTimeline extends React.Component<LogTimelineProps> {
  getRefType (log: Log) {
    return log.refType!.charAt(0).toUpperCase() + log.refType!.slice(1)
  }

  getAction (log: Log) {
    switch(log.action) {
      case 'create':
        return 'creation'
      case 'update':
        return 'update'
      case 'delete':
        return 'deletion'
      default:
        return log.action
    }
  }

  getColor (log: Log) {
    switch(log.action) {
      case 'create':
        return 'green'
      case 'delete':
        return 'red'
      default:
        return 'blue'
    }
  }

  userPopover (user?: User) {
    if (!user) {
      return (
        <div>
          User wasn't logged
        </div>
      )
    }
    return (
      <NavLink
        to={`/admin/users/${user?.id}`}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <UserAvatar user={user} />
          </div>
          <div
            style={{
              marginLeft: '0.8em',
            }}
          >
            <b>{user?.name}</b><br />
            <span>{user?.email}</span>
          </div>
        </div>
      </NavLink>
    )
  }

  logDetails(log: Log) {
    switch(log.refType) {
      case 'brand':
        return <div><Link to={`/brand/info?brand=${log.refId}`}>{log.refId}</Link></div>
      case 'product':
        return <div><Link to={`/brand/products/product?product=${log.refId}`}>{log.refId}</Link></div>
      default:
        return <div>No type reference<br /></div>
    }
  }

  render () {
    if (!this.props.logs) {
      return (
        <p>No data</p>
      )
    }
    return (
      <Timeline>
        {
          this.props.logs.map((log) => {
            return (
              <Timeline.Item
                color={this.getColor(log)}
              >
                <span>{this.getRefType(log)} {this.getAction(log)}</span>
                <br />
                {
                  this.props.full ? this.logDetails(log) : null
                }
                <Tooltip title={moment(log.date).format('LLL')}>
                  <i>{moment(log.date).fromNow()}</i>
                </Tooltip>
                <br />
                <Popover content={this.userPopover(log.user)}>
                  <span>by <i>{log.user?.name ? log.user.name : 'nobody'}</i></span>
                </Popover>
              </Timeline.Item>
            )
          })
        }
      </Timeline>
    )
  }
}