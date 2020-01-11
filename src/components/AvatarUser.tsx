import React from 'react'
import { User } from 'booster-js-client'
import { Avatar, Icon } from 'antd'

interface UserAvatarProps {
  user?: User
}

export default class UserAvatar extends React.Component<UserAvatarProps> {
  getAvatarName = () => {
    const regex = /[aeiouy]/gi
    const name = this.props.user?.name
    if (!name) {
      return ''
    }

    const vowels = name.match(regex)
    if (!vowels) {
      return name.substr(0, 3)
    }
    
    let l = name.indexOf(vowels[0])
    if (l > 3) {
      return name.substr(0, 3)
    }
    const l2 = name.indexOf(vowels[1])
    if (l == 0 && l2 < 3) {
      l = l2
    }

    return name.substr(0, l + 1)
  }

  render () {
    return (
      <Avatar
        size={36}
        style={{
          fontSize: "30",
          color: "#fffff",
          backgroundColor: "#333"
        }}
      >
        {
          this.getAvatarName() === '' ?
            <Icon type="loading" />
          : this.getAvatarName().toUpperCase()
        }
      </Avatar>
    )
  }
}