import React from 'react';

class RoundContainer extends React.Component {
  render() {
    return (
    <div className='round'>
      <div className='round-top-title'>{this.props.titleTop}</div>
      <div className='round-middle-title'>{this.props.titleMiddle}</div>
      <div className='round-bottom-title'>{this.props.titleBottom}</div>
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
