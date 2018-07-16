import React, { Component } from 'react';
import styled from 'styled-components';
import parse from 'url-parse';
import { Button } from '../Button';

export class Step extends Component {
  render() {
    const { name, url, isActive, onDone } = this.props;
    const { hostname } = parse(url);

    return (
      <StepContainer isActive={isActive}>
        {isActive && <Button onClick={onDone}>Done</Button>}
        <StepName>{name}</StepName>
        <StepUrl>
          <a href={url} target="_blank">
            {hostname}
          </a>
        </StepUrl>
      </StepContainer>
    );
  }
}

const StepContainer = styled.div`
  box-sizing: border-box;
  padding: 12px 16px;
  background: ${props => (props.isActive ? '#fff' : 'transparent')};
`;

const StepName = styled.div`
  font-size: 16px;
  line-height: 20px;
`;

const StepUrl = styled.div`
  margin: 2px 0 2px 0;
  font-size: 14px;
  line-height: 16px;

  a {
    color: #666;
  }
`;
