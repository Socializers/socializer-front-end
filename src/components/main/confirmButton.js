import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default class ConfirmButton extends React.Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
    times: PropTypes.number,
  };

  static defaultProps = {
    times: 2,
  };

  state = {
    timesPressed: 0,
  };

  onPress = () => {
    const { timesPressed } = this.state;
    const { action, times } = this.props;
    this.setState(
      {
        timesPressed: timesPressed + 1,
      },
      () => {
        if (this.state.timesPressed === times) {
          action();
          this.setState({ timesPressed: 0 });
        }
      },
    );
  };

  render() {
    const { timesPressed } = this.state;
    const { dialog } = this.props;
    return (
      <Button level={timesPressed} onClick={this.onPress}>
        {dialog[timesPressed]}
      </Button>
    );
  }
}

const Button = styled.button`
  border: none;
  background: #c62828;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  text-transform: uppercase;
  font-weight: 900;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  width: 35%;
  &:hover {
    cursor: pointer;
  }
  ${({ level }) => {
    if (level === 1)
      return `
      transform: scale(1.1);
      background: #B73C3C;
    `;
    if (level === 2)
      return `
      transform: scale(1.2);
      background: #5B1E1E;
    `;
  }};
`;
