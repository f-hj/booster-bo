import React from "react";
import { Modal, Form, Input, Button, Icon, Upload } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { RcFile } from "antd/lib/upload";
import store from "../module/Store";
import { Product } from "booster-js-client";

interface ModalAddImageProps {
  visible: boolean
  onSubmit: () => void
  onCancel: () => void
  loading?: boolean
  product: Product
}

interface ModalAddImageState {
  loading: boolean
  file?: RcFile
  name: string
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

export default class ModalAddImage extends React.Component<ModalAddImageProps> {
  public state: ModalAddImageState = {
    loading: false,
    name: '',
  }
  render () {
    return (
      <Modal
          title="Add an image"
          visible={this.props.visible}
          onOk={async () => {}}
          onCancel={this.props.onCancel}
          footer={[
            <Button key="back" onClick={this.props.onCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={this.state.loading} onClick={async () => {
              const reader = new FileReader();
              reader.readAsDataURL(this.state.file as Blob); 
              reader.onloadend = async () => {           
                  await store.api.images.productImageUpload(this.props.product.id!, {
                    name: this.state.name,
                    content: reader.result?.toString(),
                  })

                  this.props.onSubmit()
              }
            }}>
              Upload
            </Button>,
          ]}
        >
            <Upload.Dragger
              multiple={false}
              beforeUpload={(file) => {
                this.setState({ file })
                return false
              }}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
              </p>
            </Upload.Dragger>
            <br />
            <Form.Item label="Image description">
              <Input
                placeholder="Green T-shirt, side view"
                type="text"
                size="large"
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </Form.Item>
        </Modal>
    )
  }
}