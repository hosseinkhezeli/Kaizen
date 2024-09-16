import { Components, Theme } from '@mui/material/styles';

export const MuiMenu: Components<Theme>['MuiMenu'] = {
  styleOverrides: {
    root: ({ ownerState, theme }) => ({}),
    paper: ({ ownerState, theme }) => ({
      backgroundColor: 'transparent',
      '--Paper-overlay': 'rgba(0, 0, 0, 1) !important',
      '--Paper-shadow': 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px !important',
      backdropFilter: 'blur(13px)',
      borderRadius: 16,
      padding: '8px 0px',
    }),
  },
};
