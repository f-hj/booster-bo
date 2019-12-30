import React from "react";
import { Layout, Menu, Breadcrumb, Icon, Form, Typography, Input, Button } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import Store from "../../module/Store";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface RegisterUserAdminPageProps extends FormComponentProps {}
interface RegisterUserAdminPageState {
  loading: boolean
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
  style: {
    paddingTop: '0.8em'
  }
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

export class TRegisterUserAdminPage extends React.Component<RegisterUserAdminPageProps, RegisterUserAdminPageState> {
  public state: RegisterUserAdminPageState = {
    loading: false
  }

  public render () {
    return (
      <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Register user</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Typography.Text type="secondary">
              Register a user
            </Typography.Text>
            <div style={{marginTop: '2em'}} />
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
                      .createUser({
                        user: {
                          name: values.name,
                          password: values.password,
                          email: values.email,
                        },
                      })
                      .then(res => {
                        
                      })
                      .catch(res => {})
                      .finally(() => {
                        this.setState({ loading: false });
                      });
                  });
                }}
              >
                <Form.Item {...formItemLayout} label="Name" help="Only used to have a correct name">
                  {this.props.form.getFieldDecorator("name", {
                    rules: [
                      { required: true, message: "Please input a user name!" }
                    ]
                  })(
                    <Input
                      placeholder="Sacha Rbonne"
                      type="text"
                      size="large"
                    />
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="Email" help="Used for login">
                  {this.props.form.getFieldDecorator("email", {
                    rules: [
                      { required: true, message: "Please input a user email!" }
                    ]
                  })(
                    <Input
                      placeholder="sacha@rbonne.wtf"
                      type="text"
                      size="large"
                    />
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="Password" >
                  {this.props.form.getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input a user password!" }
                    ]
                  })(
                    <Input
                      placeholder="********"
                      type="password"
                      size="large"
                    />
                  )}
                </Form.Item>
                <Form.Item {...formTailLayout}>
                <Button
                  htmlType="submit"
                  block={true}
                  loading={this.state.loading}
                  type="primary"
                >
                  Create user
                </Button>
                </Form.Item>
            </Form>
          </div>
        </Content>
    )
  }
}

const RegisterUserAdminPage = Form.create<
  FormComponentProps<any> & {
    onSubmit: (data: any) => void;
    onCancel: () => void;
  }
>()(TRegisterUserAdminPage);

export default RegisterUserAdminPage;
