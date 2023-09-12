import styled from 'styled-components';
import { flex, flexcc } from '../../global/styles/variables';

export const FlexContainer = styled.div`
  ${({ justify, align, direction }: { justify?: string, align?: string, direction?: string }) => flex(justify, align, direction)}
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

export const SectionContainer = styled.section`
  width: 100%;
  height: 100%;
`;

export const ButtonContainer = styled.button`
  background-color: transparent;
  border: none;
  ${flexcc}
`;

export const Sidebar = styled.div`
  width: 80px;
  height: 100vh;
  position: relative;
  left: 0;
`
export const BigContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`

export const FiltersContainer = styled.div`
    ${flex('flex-start')}
    padding-top: 25px;
    padding-bottom: 25px;
`

export const InputContainer = styled.div`
    --proportion: calc( 100vw / 1920);
    padding-right: calc(20 * var(--proportion));
    width: calc(282 * var(--proportion));
`

export const SimpleSelectContainer = styled.div`
    --proportion: calc( 100vw / 1920);
    padding-right: calc(20 * var(--proportion));
    width: calc(192 * var(--proportion));
`

export const MultiSelectContainer = styled.div`
    --proportion: calc( 100vw / 1920);
    padding-right: calc(20 * var(--proportion));
    width: calc(500 * var(--proportion));
`

export const DateContainer = styled.div`
    --proportion: calc( 100vw / 1920);
    padding-right: calc(20 * var(--proportion));
`
