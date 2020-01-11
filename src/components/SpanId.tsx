import React from "react";

interface SpanIdProps {
  id?: string
  object?: {
    id?: string
  }
}

export default class SpanId extends React.Component<SpanIdProps> {
  render () {
    return (
      <span
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          fontFeatureSettings: "'ss01' 1, 'ss02' 1",
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {this.props.id || this.props.object?.id}
      </span>
    )
  }
}