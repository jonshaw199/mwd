import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const backgroundImage = require("../res/background.png");

const useStyles = makeStyles((theme) => ({
  fullPageImage: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
  },
}));

const Home = () => {
  const { navHeight } = useSelector((state) => ({
    navHeight: state.navReducer.navHeight,
  }));
  const classes = useStyles();
  return (
    <React.Fragment>
      <div
        className={classes.fullPageImage}
        style={{ height: `calc(100vh - ${navHeight}px)` }}
      ></div>
    </React.Fragment>
  );
};

export default Home;
