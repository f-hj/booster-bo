import React from "react";
import { Layout, Row, Col, Button, Input, Divider, Icon, Form, notification } from "antd";
import { FormComponentProps } from "antd/lib/form";
import Store from "../module/Store";
import { RouteComponentProps } from "react-router-dom";

interface LoginProps extends FormComponentProps, RouteComponentProps<any> {}
interface LoginState {
  loading: boolean;
}

class TLogin extends React.Component<LoginProps, LoginState> {
  public state: LoginState = {
    loading: false
  }

  render() {
    return (
      <Layout
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Layout.Content style={{ flex: "1 1 auto", display: "flex" }}>
          <Row
            type="flex"
            justify="space-around"
            align="middle"
            style={{ flex: "1 1 auto" }}
          >
            <Col
              xs={24}
              sm={20}
              md={14}
              lg={10}
              xl={8}
              xxl={6}
              style={{
                background: "#FFFFFF",
                padding: "28px 2%",
                textAlign: "center",
                minHeight: "360px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: "4px"
              }}
            >
              <h1 style={{ marginTop: 16, marginBottom: 24 }}>Booster</h1>
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  this.props.form.validateFields(async (err, values) => {
                    if (err) {
                      console.log(err);
                      return;
                    }

                    this.setState({ loading: true });

                    Store.api.users
                      .loginUser({
                        email: values.email,
                        password: values.password
                      })
                      .then(res => {
                        localStorage.setItem('booster-token', res.data.token!)
                        Store.currentUser = res.data.user

                        let desc = `Hello ${Store.currentUser?.name}.`
                        if (Store.currentUser?.isAdmin) {
                          desc += ` You're a FUCKING ADMIN! OH YEAH!`
                        }
                        notification.success({
                          message: 'Logged in',
                          description: desc,
                        })
                        this.props.history.push('/dashboard')
                      })
                      .catch(res => {
                      })
                      .finally(() => {
                        this.setState({ loading: false });
                      });
                  });
                }}
              >
                <Form.Item>
                  {this.props.form.getFieldDecorator("email", {
                    rules: [
                      { required: true, message: "Please input your username!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Email"
                      type="email"
                      size="large"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {this.props.form.getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input your password!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Password"
                      type="password"
                      size="large"
                    />
                  )}
                </Form.Item>
                <Button
                  htmlType="submit"
                  block={true}
                  loading={this.state.loading}
                  type="primary"
                  size="large"
                  style={{ margin: "10px 0" }}
                >
                  Login
                </Button>
              </Form>
              <p style={{ color: "rgba(0,0,0,0.65)" }}>
                Don't have an account?{" "}
                <a href="https://booster.fruitice.fr/#contact">Sign up</a>
              </p>
            </Col>
          </Row>
        </Layout.Content>
        <Layout.Footer
          style={{ textAlign: "center", flex: "0 0 auto" }}
        ></Layout.Footer>
      </Layout>
    );
  }
}

const Login = Form.create<
  FormComponentProps<any> & {
    onSubmit: (data: any) => void;
    onCancel: () => void;
  }
>()(TLogin);

export default Login;
