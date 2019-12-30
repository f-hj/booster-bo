import React from "react";
import { Layout, Menu, Breadcrumb, Icon, Form, Typography, Input, Button, Select } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import Store from "../../module/Store";
import TextArea from "antd/lib/input/TextArea";
import queryString from 'query-string'
import { RouteComponentProps } from "react-router";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface AddProductPageProps extends FormComponentProps, RouteComponentProps<any> {}
interface AddProductPageState {
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

export class TAddProductPage extends React.Component<AddProductPageProps, AddProductPageState> {
  public state: AddProductPageState = {
    loading: false
  }

  public render () {
    return (
      <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
            <Breadcrumb.Item>Add a product</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Typography.Text type="secondary">
              Add a product
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

                    Store.api.products
                      .createProduct({
                        product: {
                          brand: {
                            id: queryString.parse(this.props.location.search).brand as string,
                            name: '',
                          },
                          name: values.name,
                          description: values.description,
                          currency: 'EUR',
                          price: 5,
                        },
                      })
                      .then(res => {
                        console.log(res)
                      })
                      .catch(res => {})
                      .finally(() => {
                        this.setState({ loading: false });
                      });
                  });
                }}
              >
                <Form.Item {...formItemLayout} label="Name" help="Product main name">
                  {this.props.form.getFieldDecorator("name", {
                    rules: [
                      { required: true, message: "Please input a product name!" }
                    ]
                  })(
                    <Input
                      placeholder="T-shirt Regular fit"
                      type="text"
                      size="large"
                    />
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="Description" help="Used for login">
                  {this.props.form.getFieldDecorator("description", {
                    rules: [
                    ]
                  })(
                    <TextArea
                      placeholder="Awesome t-shirt, handmade from alpaca wool"
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="Currency" >
                  {this.props.form.getFieldDecorator("currency", {
                    rules: [
                      { required: true, message: "Please select a real currency!" }
                    ]
                  })(
                    <Select>
                      <Select.Option value='EUR'>Euro (EUR)</Select.Option>
                      <Select.Option value='USD'>Dollars US (USD)</Select.Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="Price" help="Price showed on marketing side">
                  {this.props.form.getFieldDecorator("price", {
                    rules: [
                      { required: true, message: "Please input a price! (even 9000)" }
                    ]
                  })(
                    <Input
                      placeholder="9000"
                      type="number"
                      size="large"
                      suffix="T"
                    />
                  )}
                </Form.Item>
                <br />
                <Form.Item {...formTailLayout}>
                  <Button
                    htmlType="submit"
                    block={true}
                    loading={this.state.loading}
                    type="primary"
                  >
                    Add this product
                  </Button>
                </Form.Item>
            </Form>
          </div>
        </Content>
    )
  }
}

const AddProductPage = Form.create<
  FormComponentProps<any> & {
    onSubmit: (data: any) => void;
    onCancel: () => void;
  }
>()(TAddProductPage);

export default AddProductPage;
