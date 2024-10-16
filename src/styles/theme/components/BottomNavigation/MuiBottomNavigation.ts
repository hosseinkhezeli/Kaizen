import { Components, Theme } from '@mui/material/styles';

export const MuiBottomNavigation: Components<Theme>['MuiBottomNavigation'] = {
  styleOverrides: {
    root: ({ theme }) => {
      return {
        backgroundColor: 'transparent',
        backdropFilter: 'blur(8px)',
        borderRadius: '72px',
        position: 'fixed',
        zIndex: 10,
        bottom: 8,
        left: 8,
        width: 'calc(100% - 16px)',
        margin: '0 auto',
        padding: '4px 8px',
        border: '1px solid',
        borderColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey['700']
            : theme.palette.grey['300'] + '55 !important',
        fontFamily: 'inherit',
      };
    },
  },
};
