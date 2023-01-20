import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

import { IconClients, IconAppointments, IconEmployee } from "./icons.styles";

export const NavAdmin = () => {
  return (
    <>
      <Nav.Link className="navItem">
        <NavLink to="/nav/clients">
          <div className="navItemImg">
            <IconClients />
          </div>
          <p>Clients</p>
        </NavLink>
      </Nav.Link>
      <Nav.Link className="navItem ">
        <NavLink to="/nav/all-appointments">
          <div className="navItemImg">
            <IconAppointments />
          </div>
          <p>Rendez-vous</p>
        </NavLink>
      </Nav.Link>
      <Nav.Link className="navItem">
        <NavLink to="/nav/employes">
          <div className="navItemImg">
            <IconEmployee />
          </div>
          <p>Employés</p>
        </NavLink>
      </Nav.Link>
    </>
  );
};
