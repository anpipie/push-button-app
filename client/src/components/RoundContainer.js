import React from 'react';

class RoundContainer extends React.Component {
  render() {
    return (
    <div className='round'>
      <div className='round-top-title'>{this.props.title1}</div>
      <div className='round-middle-title'>{this.props.title2}</div>
      <div className='round-bottom-title'>{this.props.title3}</div>
    </div>
    )
  }
}

RoundContainer.defaultProps = {
  title1: '',
  title2: '',
  title3: ''
}

export default RoundContainer;
