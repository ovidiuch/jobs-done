import { number, string, bool, func, arrayOf, oneOf } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import parse from 'url-parse';
import { Checkbox } from '../Checkbox';

export class Step extends Component {
  static propTypes = {
    stepIndex: number.isRequired,
    name: string.isRequired,
    urls: arrayOf(string).isRequired,
    state: oneOf(['hidden', 'active', 'past']).isRequired,
    isChecked: bool.isRequired,
    onSelect: func.isRequired
  };

  handleSelect = () => {
    const { stepIndex, state, onSelect } = this.props;

    if (state !== 'hidden') {
      onSelect(stepIndex);
    }
  };

  handleUrlClick = e => {
    const { state } = this.props;

    if (state !== 'active') {
      e.preventDefault();
    }

    // - When active: Prevent step from being checked when following links
    // - When past: Select step instead of following links
    if (state === 'active') {
      e.stopPropagation();
    }
  };

  render() {
    const { name, urls, state, isChecked } = this.props;

    return (
      <Container state={state} onClick={this.handleSelect}>
        <Left>
          <Name>{name}</Name>
          {urls.map(url => {
            const { hostname } = parse(url);

            return (
              <Url key={url} state={state}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={this.handleUrlClick}
                >
                  {hostname}
                </a>
              </Url>
            );
          })}
        </Left>
        <ButtonContainer>
          <Checkbox checked={isChecked} />
        </ButtonContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding: 0 20px 16px 20px;
  background: ${props =>
    props.state === 'active' ? 'rgba(217, 223, 247, 0.12)' : 'transparent'};
  cursor: ${props => (props.state === 'hidden' ? 'default' : 'pointer')};
  user-select: none;

  @media (min-width: 553px) {
    border-radius: 5px;
  }
`;

const Left = styled.div`
  flex: 1;
  min-width: 280px;
`;

const Name = styled.div`
  margin: 16px 0 4px 0;
  font-size: 18px;
  line-height: 24px;
`;

const Url = styled.div`
  font-size: 16px;
  line-height: 24px;

  a {
    display: inline-block;
    color: rgba(217, 223, 247, 0.6);
    cursor: ${props => (props.state === 'hidden' ? 'default' : 'pointer')};
  }
`;

const ButtonContainer = styled.div`
  flex-shrink: 0;
  margin: 16px 0 0 0;
`;
