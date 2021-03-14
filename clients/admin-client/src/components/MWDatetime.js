import React from "react";

const getTime = () => {
  return new Date().toLocaleString();
};

function MWDatetime() {
  const [time, setTime] = React.useState(getTime());

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => {
      clearInterval(interval);
      interval = null;
    };
  }, []);

  return <span>{time}</span>;
}

export default MWDatetime;
