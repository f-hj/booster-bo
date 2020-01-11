import React from 'react'
import { Image } from 'booster-js-client'
import { Card, Icon, Modal, notification } from 'antd'
import SpanId from './SpanId'
import store from '../module/Store'

interface ImageProductProps {
  image?: Image
}

export default class ImageProduct extends React.Component<ImageProductProps> {
  deleteImage () {
    Modal.confirm({
      title: 'Are you sure delete this image?',
      content: 'This is not recoverable',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        await store.api.images.deleteImage(this.props.image?.id!).then(() => {
          notification.success({
            message: 'Deleted'
          })
        }).catch(err => {
          notification.error({
            message: err.response.data.errors
          })
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }

  render () {
    if (!this.props.image) {
      return null
    }
    return  (
      <Card
        hoverable
        cover={
          <img
            style={{
              height: '10em',
              objectFit: 'cover'
            }}
            alt={this.props.image.name}
            src={`https://api.booster.fruitice.fr/v1/images/image/${this.props.image.id}`}
          />
        }
        actions={[
          <Icon type="edit" key="edit" />,
          <Icon type="delete" key="delete" onClick={this.deleteImage.bind(this)} />,
        ]}
      >
        <Card.Meta title={this.props.image.name} description={<SpanId object={this.props.image} />} />
      </Card>
    )
  }
}