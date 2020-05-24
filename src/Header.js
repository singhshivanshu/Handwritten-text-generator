import React from "react";
import Navbar from "react-bootstrap/Navbar";


function Header() {
  return (
    <Navbar  variant="dark" style ={{height: "100px"}}>
      <Navbar.Brand id ="header-name" className="mx-auto">Image-text Recognizer</Navbar.Brand>

    </Navbar>
  );
}

export default Header;
