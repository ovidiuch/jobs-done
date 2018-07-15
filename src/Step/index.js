import React, { Component } from 'react';
import styled from 'styled-components';
import parse from 'url-parse';

export class Step extends Component {
  render() {
    const { name, url, isActive, onDone } = this.props;
    const { hostname } = parse(url);

    return (
      <StepContainer isActive={isActive}>
        {isActive && <DoneButton onClick={onDone}>Done</DoneButton>}
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
  opacity: ${props => (props.isActive ? 1 : 0.6)};
`;

const StepName = styled.div`
  font-size: 16px;
  line-height: 18px;
`;

const StepUrl = styled.div`
  margin: 2px 0 0 0;
  font-size: 14px;
  line-height: 16px;

  a {
    color: #666;
  }
`;

const DoneButton = styled.button`
  float: right;
  display: block;
  height: 36px;
  margin: 0;
  padding: 0 16px;
  border: 0;
  border-radius: 4px;
  background: #666;
  color: #f1f1f1;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
`;
