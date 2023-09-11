import { createMuiTheme } from '@material-ui/core';

import Theme from '../../global/styles/theme';

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: Theme.colors.black,
    },
    secondary: {
      main: Theme.colors.blue,
    },
  },
});

export default outerTheme;
