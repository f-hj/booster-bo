import React from "react";
import { Layout, Menu, Breadcrumb, Icon, Form, Typography, Input, Button } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import Store from "../../module/Store";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface RegisterBrandAdminPageProps extends FormComponentProps {}
interface RegisterBrandAdminPageState {
  loading: boolean
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

export class TRegisterBrandAdminPage extends React.Component<RegisterBrandAdminPageProps, RegisterBrandAdminPageState> {
  public state: RegisterBrandAdminPageState = {
    loading: false
  }

  public render () {
    return (
      <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Register brand</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Typography.Text type="secondary">
              Register a brand with minimal settings
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

                    Store.api.brands
                      .createBrand({
                        brand: {
                          name: values.name
                        }
                      })
                      .then(res => {})
                      .catch(res => {})
                      .finally(() => {
                        this.setState({ loading: false });
                      });
                  });
                }}
              >
                <Form.Item {...formItemLayout} label="Brand name">
                  {this.props.form.getFieldDecorator("name", {
                    rules: [
                      { required: true, message: "Please input a brand name!" }
                    ]
                  })(
                    <Input
                      placeholder="La Fabrique Verte"
                      type="text"
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
                    Create brand
                  </Button>
                </Form.Item>
            </Form>
          </div>
        </Content>
    )
  }
}

const RegisterBrandAdminPage = Form.create<
  FormComponentProps<any> & {
    onSubmit: (data: any) => void;
    onCancel: () => void;
  }
>()(TRegisterBrandAdminPage);

export default RegisterBrandAdminPage;
