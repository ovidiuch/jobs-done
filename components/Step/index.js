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
        <Left>
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
        </Left>
        <ButtonContainer>
          <Button disabled={!isActive} onClick={onDone}>
            Done
          </Button>
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
    color: rgba(217, 223, 247, 0.6);
  }
`;

const ButtonContainer = styled.div`
  flex-shrink: 0;
  margin: 16px 0 0 0;
`;
