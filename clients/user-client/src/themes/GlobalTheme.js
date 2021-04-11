const SPACING_MULTIPLIER = 1.0;
const headingFontFamily = "Norwester";
const subHeadingFontFamily = "Kollektif";
const bodyFontFamily = "Montserrat";

const global = {
  typography: {
    h1: {
      fontFamily: headingFontFamily,
    },
    h2: {
      fontFamily: headingFontFamily,
    },
    h3: {
      fontFamily: headingFontFamily,
    },
    h4: {
      fontFamily: headingFontFamily,
    },
    h5: {
      fontFamily: subHeadingFontFamily,
    },
    h6: {
      fontFamily: subHeadingFontFamily,
    },
    subtitle1: {
      fontFamily: bodyFontFamily,
    },
    subtitle2: {
      fontFamily: bodyFontFamily,
    },
    body1: {
      fontFamily: bodyFontFamily,
    },
    body2: {
      fontFamily: bodyFontFamily,
    },
    button: {
      fontFamily: bodyFontFamily,
    },
    caption: {
      fontFamily: bodyFontFamily,
    },
    overline: {
      fontFamily: bodyFontFamily,
    },
  },
  zIndex: {
    imageDialog: 1500,
    imageDialogOverlay: 1600,
    imageDialogOverlayAgain: 1700,
    navbar: 1400,
    drawer: 1300,
    adminLoginDialog: 1500,
  },
  custom: {
    spacing: {
      appBody: 1 * SPACING_MULTIPLIER,
      verticalHeading: 4.5 * SPACING_MULTIPLIER,
      aLittleExtra: 1.5 * SPACING_MULTIPLIER,
      verticalFooter: 6 * SPACING_MULTIPLIER,
      noHeading: 6 * SPACING_MULTIPLIER,
      headingAndDiv: 0.75 * SPACING_MULTIPLIER,
    },
    opacity: {
      footerOpacity: 0.33,
    },
    typography: {
      heading: "h3",
      body: "body2",
      emphasizedBody: "",
    },
    width: {
      maxTextWidth: "750px",
      headingDivider: "50px",
    },
    height: {
      navbar: {
        small: "66px",
        large: "66px",
      },
    },
  },
};

export default global;
