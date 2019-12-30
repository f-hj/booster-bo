import { Timeline } from "antd";
import React from "react";
import { Log } from "booster-js-client";

interface LogTimelineProps {
  logs?: Log[]
}

export default class LogTimeline extends React.Component<LogTimelineProps> {
  getRefType (log: Log) {
    return log.refType!.charAt(0).toUpperCase() + log.refType!.slice(1)
  }

  getAction (log: Log) {
    switch(log.action) {
      case 'create':
        return 'Creation'
      case 'update':
        return 'Update'
      case 'delete':
        return 'Deletion'
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
                <span>{this.getRefType(log)} {this.getAction(log)}</span><br />
                <span>on {log.date}</span><br />
                <span>by {log.user?.name}</span>
              </Timeline.Item>
            )
          })
        }
      </Timeline>
    )
  }
}