// src/fonts.tsx
import { Global } from "@emotion/react";

export const Fonts = () => (
  <Global
    styles={`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
      @font-face {
        font-family: 'Trancinfont';
        font-style: normal;
        font-weight: normal;
        src: url('/fonts/Hotel_trancinvania-Regular.otf') format('opentype'),
             url('/fonts/Hotel_trancinvania-Regular.ttf') format('truetype');
      }
    `}
  />
);
