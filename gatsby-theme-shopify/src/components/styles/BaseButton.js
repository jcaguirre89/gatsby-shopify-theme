import styled from 'styled-components';

const BaseButton = styled.button`
  width: 100%;
  background: ${props => props.theme.gold};
  border: 1px solid ${props => props.theme.gold};
  color: ${props => props.theme.white};
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: -0.1px;
  font-weight: 500;
  font-size: 1.5rem;
  cursor: pointer;
`;

export default BaseButton;
