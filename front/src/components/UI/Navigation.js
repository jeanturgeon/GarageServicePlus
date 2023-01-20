import { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

import logo from '../../logo.png'
import { AuthContext } from "../../util/auth.context";
import { NavAdmin } from "./nav-admin";
import { NavEmployee } from "./nav-employee";


export default function Navigation() {
  const {isAdmin} = useContext(AuthContext)
  return (
    <>
    <Nav className="flex-column">
     <Nav.Link>
        <NavLink to="/nav/home">
            <div className="logoNav">
                <img src={logo} alt='logo'/>
            </div>           
        </NavLink>
      </Nav.Link>
      
    {
      isAdmin ? <NavAdmin /> : <NavEmployee /> 
    }
    </Nav>
    </>
  );
}
