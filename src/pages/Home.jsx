import React from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { ReactComponent as HomeIcon } from "../assets/icon/Home.svg";
import { Button } from "@mui/material";
import SayembaraCard from "../components/SayembaraCard";

function HomeMenuItem(props) {
  return (
    <div className="cr-home-menu-item">
      <strong className="cr-home-menu-item--title">{props.title}</strong>
      <Link to={props?.to ?? "/"}>
        <Button
          variant="contained"
          size="large"
          className="cr-home-menu-item--button"
        >
          <Icon icon={props.icon ?? <HomeIcon />} size="2rem" />
        </Button>
      </Link>
    </div>
  );
}

class Home extends React.Component {
  render() {
    return (
      <div className="cr-home">
        <div className="cr-home-menu">
          <HomeMenuItem title="Event" />
          <HomeMenuItem title="Lost item" />
          <HomeMenuItem title="Funding" />
        </div>
        <div className="cr-home-break">
          <div className="cr-home-break-line"></div>
          <span className="cr-home-break-text">TOP</span>
          <div className="cr-home-break-line"></div>
        </div>
        <div className="cr-home-popular">
          <SayembaraCard title="Logo Design" />
          <SayembaraCard title="Logo Design" />
          <SayembaraCard title="Logo Design" />
        </div>
      </div>
    );
  }
}

export default Home;
