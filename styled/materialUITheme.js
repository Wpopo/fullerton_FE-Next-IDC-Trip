import { createMuiTheme } from '@material-ui/core/styles';
import Palette from './palette';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      // ref Fullerton breakpoint
      xs: 0,
      sm: 375 + 1,
      md: 540 + 1,
      lg: 720 + 1,
      xl: 1024 + 1
    }
  },
  typography: {
    fontFamily: [
      'Noto Sans TC',
      'Helvetica',
      'Quicksand',
      'Microsoft JhengHei',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif'
    ].join(',')
  },
  overrides: {
    MuiPaper: {
      root: {
        fontFamily: [
          'Noto Sans TC',
          'Helvetica',
          'Quicksand',
          'Microsoft JhengHei',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ].join(',')
      }
    },
    MuiButton: {
      root: {
        width: '100px',
        height: '38px',
        fontSize: '14px',
        fontWeight: 'normal',
        borderRadius: '30px',
        transition: 'none!important',
        boxShadow: 'none!important',
        backgroundColor: 'unset!important',
        '@media (max-width:375px)': {
          width: '120px',
          height: '45px',
          fontSize: '20px',
          lineHeight: '16px'
        }
      },
      text: {
        color: Palette.secondary['gray-50'],
        padding: 0,
        '&:hover': {
          border: `2px solid ${Palette.primary['blue-3']}`
        }
      },

      contained: {
        color: '#FFFFFF',
        backgroundColor: `${Palette.primary['blue-2']} !important`,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)'
        }
      },

      outlined: {
        color: Palette.primary['white-1'],
        border: `1px solid ${Palette.secondary['gray-20']}`
      }
    },
    MuiSelect: {
      root: {
        border: '1px solid #ced4da',
        'box-sizing': 'border-box',
        display: 'flex',
        padding: '0 0 0 22px',
        position: 'relative',
        flexWrap: 'wrap',
        fontSize: '20px',
        boxSizing: 'border-box',
        alignItems: 'center',
        fontWeight: 300,
        backgroundColor: '#ffffff'
      },
      selectMenu: {
        height: '48px',
        '@media (max-width:540px)': {
          height: '60px',
          borderRadius: '30px'
        }
      },
      outlined: {
        borderRadius: '24px',
        '@media (max-width:540px)': {
          borderRadius: '30px'
        }
      },
      select: {
        '&:focus': {
          borderRadius: '24px',
          borderColor: Palette.primary['blue-1'],
          borderWidth: '2px',
          '@media (max-width:540px)': {
            borderRadius: '30px'
          }
        },
        '&:hover': {
          borderRadius: '24px',
          borderColor: Palette.primary['blue-1'],
          borderWidth: '2px',
          '@media (max-width:540px)': {
            borderRadius: '30px'
          }
        }
      },
      icon: {
        right: '20px'
      }
    },
    MuiListItem: {
      root: {
        fontSize: '20px!important',
        fontWeight: '300!important'
      }
    },
    MuiInputLabel: {
      root: {
        display: 'inline-block',
        width: '160px',
        height: '48px',
        lineHeight: '48px',
        textAlign: 'center',
        border: '1px solid #DDDDDD',
        borderRadius: '30px',
        backgroundColor: '#FFFFFF',
        color: '#000000',
        fontSize: '20px'
      }
    },
    MuiTypography: {
      h6: {
        textAlign: 'center',
        fontSize: '28px',
        color: '#595959',
        letterSpacing: '2.8px'
      },
      body1: {
        fontSize: '16px',
        fontWeight: 300,
        lineHeight: 1.38,
        color: '#404040!important'
      }
    },
    MuiDialogActions: {
      root: {
        'justify-content': 'center'
      }
    },
    MuiDialogTitle: {
      root: {
        padding: '40px 28px 10px'
      }
    },
    MuiDialogContent: {
      root: {
        padding: '8px 50px',
        maxHeight: '300px',
        marginBottom: '20px'
      }
    },
    MuiDialog: {
      paper: {
        '@media (max-width:540px)': {
          margin: '25px'
        }
      },
      paperWidthSm: {
        maxWidth: '516px',
        maxHeight: '540px'
      }
    },
    MuiFormHelperText: {
      root: {
        fontSize: '14px',
        '&.Mui-error': {
          color: Palette.error['main']
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        '&.Mui-error': {
          borderColor: Palette.error['main']
        }
      }
    },
    MuiMenuItem: {
      root: {
        'white-space': 'normal'
      }
    },
    MuiFab: {
      root: {
        color: Palette.primary['blue-2']
      }
    }
  }
});

export default theme;
