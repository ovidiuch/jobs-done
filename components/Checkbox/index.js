import React from 'react';
import styled from 'styled-components';

export const Checkbox = props => (
  <StyledCheckbox {...props}>
    <span className="check">
      <span className="shortBar" />
      <span className="longBar" />
    </span>
  </StyledCheckbox>
);

export const StyledCheckbox = styled.div`
  position: relative;
  width: 52px;
  height: 52px;
  box-sizing: border-box;
  border-radius: 10px;
  background: rgba(0, 9, 21, 0.3);
  transition: background 0.6s, border-color 0.6s;

  .check {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -3px 0 0 0;
    width: 32px;
    height: 16px;
    opacity: ${props => (props.checked ? 1 : 0)};
    transform: ${props =>
      props.checked
        ? 'translate(-50%, -50%) rotate(-50deg) scale(1)'
        : 'translate(-50%, -50%) rotate(-50deg) scale(0.5)'};
    transition: transform 0.6s, opacity 0.6s;

    .shortBar,
    .longBar {
      position: absolute;
      background: rgba(217, 223, 247, 1);
    }

    .shortBar {
      top: 0;
      left: 0;
      width: 6px;
      height: 100%;
    }

    .longBar {
      bottom: 0;
      left: 0;
      width: 100%;
      height: 6px;
    }
  }
`;
