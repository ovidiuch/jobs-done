import { number, string, bool, func, arrayOf } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import parse from 'url-parse';
import { Checkbox } from '../Checkbox';

export class Step extends Component {
  static propTypes = {
    stepIndex: number.isRequired,
    name: string.isRequired,
    urls: arrayOf(string).isRequired,
    isActive: bool.isRequired,
    onSelect: func.isRequired
  };

  handleSelect = () => {
    this.props.onSelect(this.props.stepIndex);
  };

  handleUrlClick = e => {
    // Prevent step from being selected when opening links
    e.stopPropagation();
  };

  render() {
    const { name, urls, isActive } = this.props;

    return (
      <Container isActive={isActive} onClick={this.handleSelect}>
        <Left>
          <Name>{name}</Name>
          {urls.map(url => {
            const { hostname } = parse(url);

            return (
              <Url key={url}>
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
          <Checkbox checked={!isActive} />
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
    props.isActive ? 'rgba(217, 223, 247, 0.12)' : 'transparent'};
  cursor: pointer;

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
  }
`;

const ButtonContainer = styled.div`
  flex-shrink: 0;
  margin: 16px 0 0 0;
`;
