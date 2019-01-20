export const rowHeight = 70;
export const controlHeight = 55;
export const appColor = '#00b4d5';
export const secondaryColor = '#88e4f5';
export const actionColor = '#66b4e5';
export const inputMinWidth = 150;
export const defaultIconColor = '#444';
export const defaultTextColor = '#555';
export const borderColor = 'rgb(204, 204, 204)';
export const easing = 'cubic-bezier(0.35, 0.01, 0.77, 0.34);';
export const inputFontSize = '1.5rem';
export const inputBackgroundColor = '#fff';

export default {
  breakpoints: [400, 768, 1024, 1280, 1920],
  palette: {
    primary: appColor,
    secondary: secondaryColor,
    actionColor,
    appColor,
    borderColor,
    defaultTextColor,
    defaultIconColor,
    inputBackgroundColor,
  },
  sizes: {
    rowHeight,
    controlHeight,
    borderColor,
    inputMinWidth,
    inputFontSize,
  },
  input: {
    borderRadius: {
      xs: 0,
      lg: 0,
      xl: 0,
      default: 0,
    },
  },
  button: {
    borderRadius: {
      xs: 0,
      lg: 0,
      xl: 0,
    },
    padding: {
      lg: [12, 28],
      xl: [14, 32],
    },
  },
};
