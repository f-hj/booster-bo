import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";

interface ModalAddUserProps {
  visible: boolean
  onSubmit: (email: string) => void
  onCancel: () => void
  loading?: boolean
}

interface ModalAddUserState {
  email: string
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

export default class ModalAddUser extends React.Component<ModalAddUserProps> {
  public state: ModalAddUserState = {
    email: ''
  }
  render () {
    return (
      <Modal
          title="Add a user"
          visible={this.props.visible}
          onOk={() => {
            this.props.onSubmit(this.state.email)
          }}
          onCancel={this.props.onCancel}
        >
          <Input
            placeholder="sacha@rbonne.wtf"
            type="text"
            size="large"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </Modal>
    )
  }
}