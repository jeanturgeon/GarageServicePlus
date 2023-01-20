import { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

import { IconEmployee } from "./icons.styles";
import { AuthContext } from "../../util/auth.context";

export const NavEmployee = () => {

    const {employeeId} = useContext(AuthContext)

    return (
        <Nav.Link className="navItem">
        <NavLink to={`/nav/employe/${employeeId}`}>
          <div className="navItemImg">
            <IconEmployee />
          </div>
          <p>Mon profil</p>
        </NavLink>
      </Nav.Link>
    )
}