import React from 'react';

import { StyledImage } from './styles';

type Props = {
  width: string;
  src: string;
  alt?: string;
  className?: string;
}

function Image({
  ...props
}: Props) {
  return (
    <StyledImage {...props} />
  );
}

export default Image;
