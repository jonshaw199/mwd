const constants = {
  authTokenName: "mwd-auth-token",
  imagesRelativeToPublic: "/images",
  internalUseIds: {
    projectImageDefault: "6066ae532999bbeec69db4cc",
    projectImageDefaultName: "NoImageAvailable.png",
  },
  errors: {
    common: {
      MISSING_FIELDS: (fields) => {
        return {
          id: "ERRORS.COMMON.MISSING_FIELDS",
          msg: "One or more required fields are missing",
          missingFields: fields,
        };
      },
      FAILED: {
        id: "ERRORS.COMMON.FAILED",
        msg: "Failure",
      },
    },
    user: {
      DUPLICATE_USER: {
        id: "ERRORS.USER.DUPLICATE_USER",
        msg: "User already exists with the same email",
      },
      USER_DOESNT_EXIST: {
        id: "ERRORS.USER.USER_DOESNT_EXIST",
        msg: "User doesn't exist",
      },
    },
    auth: {
      INVALID_LOGIN: {
        id: "ERRORS.AUTH.INVALID_LOGIN",
        msg: "Invalid credentials",
      },
      NO_TOKEN: {
        id: "ERRORS.AUTH.NO_TOKEN",
        msg: "No token provided in header; you are unauthorized",
      },
    },
    image: {
      IMAGE_DOESNT_EXIST: {
        id: "ERRORS.IMAGE.IMAGE_DOESNT_EXIST",
        msg: "Image doesn't exist",
      },
    },
  },
};

module.exports = constants;
