import styled, { css } from 'styled-components';

export const flexcc = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flex = (justify: string = 'unset', align: string = 'unset', direction: string = 'unset', wrap: string = 'unset') => css`
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
  flex-direction: ${direction};
  flex-wrap: ${wrap};
`;
