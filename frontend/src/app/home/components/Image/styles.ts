import styled from 'styled-components';

type StyledImageProps = {
  width: string;
}

export const StyledImage = styled.img`
  width: ${({ width }: StyledImageProps) => (width || '8rem')};
`;
