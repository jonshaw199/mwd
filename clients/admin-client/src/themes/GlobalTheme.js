const SPACING_MULTIPLIER = 1.0;

const global = {
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
      card: 0.55 * SPACING_MULTIPLIER,
    },
    opacity: {
      footerOpacity: 0.33,
    },
    typography: {
      heading: "h4",
      body: "body1",
    },
    width: {
      maxTextWidth: "750px",
      headingDivider: "50px",
      miniDrawerOpen: "250px",
      miniDrawerClosed: "56px",
      navLogo: {
        small: "50px",
        large: "66px",
      },
    },
  },
};

export default global;
