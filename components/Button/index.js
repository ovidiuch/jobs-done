import styled from 'styled-components';

export const Button = styled.button`
  display: block;
  height: 48px;
  margin: 0;
  padding: 0 20px;
  border: 0;
  border-radius: 5px;
  background: rgba(0, 9, 21, 0.5);
  color: ${props =>
    props.disabled ? 'rgba(217, 223, 247, 0.4)' : 'rgba(217, 223, 247, 0.8)'};
  font-size: 18px;
  font-weight: 500;
  line-height: 40px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  outline: none;
  transition: color 1s;
`;
