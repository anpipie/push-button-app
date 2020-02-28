import React from 'react';

class MessageContainer extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.message}
      </div>
    )
  }
}

MessageContainer.defaultProps = {
  className: 'result-message-container',
  message: '',
}

export default MessageContainer;