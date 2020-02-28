import React from 'react';

class ClicksMessageContainer extends React.Component {
  render() {
    return (
    <div className={this.props.className}>
      Vinkki HR:ltä:<br />
      seuraava haastattelukutsu vain
      <div>
        {this.props.middleText}
      </div>
      hakemuksen päässä!
    </div>
    )
  }
}

ClicksMessageContainer.defaultProps = {
  className: '',
  middleText: '',
}

export default ClicksMessageContainer;