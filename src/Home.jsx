import React from "react";
import { Link } from "react-router-dom";
import  Logo from "./assets/logo_svg.svg";
import Footer from "./components/Footer";

function Home(){
   return <><div className="container my-5">
  <div className="p-5 text-center bg-body-tertiary rounded-3">
    <img src={Logo} alt="Logo"className="logo" />
     <h1 className="text-body-emphasis">Keeper</h1>
    <p className="col-lg-8 mx-auto fs-5 text-muted" >
    Your ideas deserve a safe place. Keeper helps you hold on to what matters most.
    </p>
    <div className="d-inline-flex gap-2 mb-5">
      <Link to ="/register" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
        Register
      </Link>
      <Link to="/login" className="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button">
        Login
      </Link>
    </div>
  </div >
  <div className="col-lg-8 mx-auto fs-5 text-muted">
    <Footer />
  </div>
</div>

</> 
}

export default Home;