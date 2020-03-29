import styled from 'styled-components';

const BaseButton = styled.button`
  width: 100%;
  background: ${props => props.theme.colors.accent};
  border: 1px solid ${props => props.theme.colors.accent};
  color: white;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: -0.1px;
  font-weight: 500;
  font-size: 1.5rem;
  cursor: pointer;

  &:disabled {
    background: #808080;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export default BaseButton;
