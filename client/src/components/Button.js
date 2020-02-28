import React from 'react';

class Button extends React.Component {
  render() {
    return (
      <button 
        className={this.props.className} 
        onClick={this.props.eventHandler}
        disabled={this.props.disabled}
      >
        {this.props.text}
      </button>
    )
  }
}

Button.defaultProps = {
  className: '',
  text: 'Click',
  disabled: false,
}

export default Button;