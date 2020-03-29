import styled from 'styled-components';

const CTA = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background: white;
  border: 1px solid white;
  color: ${props => props.theme.colors.offBlack};
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease-out;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
  }
`;

export default CTA;
