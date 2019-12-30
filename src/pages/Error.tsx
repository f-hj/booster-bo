import React from "react";
import { notification, Result, Button, Layout } from "antd";
import { RouteComponentProps } from "react-router-dom";

interface ErrorPageProps extends RouteComponentProps<any> {
}

export default class ErrorPage extends React.Component<ErrorPageProps> {
  render () {
    notification.error({
      message: 'Not found',
      description: `The page ${this.props.location.pathname} cannot be found`,
    })
    return (
      <Layout.Content style={{ margin: '0 16px' }}>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
        />
      </Layout.Content>
    )
  }
}