import styled from 'styled-components/native';

export const TextoPadrao = styled.Text`
  font-size: ${({ fontSize }) => fontSize || '16px'};
  color: ${({ color }) => color || 'white'};
  font-weight: ${({ fontWeight }) => fontWeight || 'bold'};
`;
