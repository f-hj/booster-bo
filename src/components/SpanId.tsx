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
      <span style={{ fontFeatureSettings: "'ss01' 1, 'ss02' 1" }}>
        {this.props.id || this.props.object?.id}
      </span>
    )
  }
}