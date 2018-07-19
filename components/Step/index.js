import { string, bool, func, arrayOf } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import parse from 'url-parse';
import { Button } from '../Button';

export class Step extends Component {
  static propTypes = {
    name: string.isRequired,
    urls: arrayOf(string).isRequired,
    isActive: bool.isRequired,
    onDone: func.isRequired
  };

  render() {
    const { name, urls, isActive, onDone } = this.props;

    return (
      <Container isActive={isActive}>
        {isActive && (
          <ButtonContainer>
            <Button onClick={onDone}>Done</Button>
          </ButtonContainer>
        )}
        <Name>{name}</Name>
        {urls.map(url => {
          const { hostname } = parse(url);

          return (
            <Url key={url}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {hostname}
              </a>
            </Url>
          );
        })}
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 12px 16px;
  background: ${props => (props.isActive ? '#fff' : 'transparent')};
`;

const Name = styled.div`
  margin: 0 80px 2px 0;
  font-size: 16px;
  line-height: 22px;
`;

const Url = styled.div`
  font-size: 14px;
  line-height: 22px;

  a {
    color: #666;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;
