import React from "react";
import Logo from "../assets/logo_white.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="container-fluid">
      <h1>
        <img src={Logo} alt= "logo" />
        Keeper
      </h1>

      { props.logout && <Link to="/" className="btn btn-outline-secondary btn-lg px-4 rounded-pill logout" type="button">
        Log Out
      </Link>}
    </header>
  );
}

export default Header;