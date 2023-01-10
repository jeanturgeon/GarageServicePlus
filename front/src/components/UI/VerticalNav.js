import Nav from "react-bootstrap/Nav";
import logo from '../../logo.png'
import { NavLink } from "react-router-dom";

export default function VerticalNav() {
  return (
    <Nav className="flex-column">
     <Nav.Link>
        <NavLink to="/">
            <div className="logoNav">
                <img src={logo} alt='logo'/>
            </div>           
        </NavLink>
      </Nav.Link>
      <Nav.Link className="navItem">
        <NavLink to="/clients">
            <div className="navItemImg">
                <i className="fa-solid fa-users fa-5x"></i>
            </div>
            <p>Clients</p>            
        </NavLink>
      </Nav.Link>
      <Nav.Link className="navItem ">
        <NavLink to="/all-appointments">
            <div className="navItemImg">
                <i className="fa-regular fa-calendar-days fa-5x"></i>
            </div>
            <p>Rendez-vous</p>            
        </NavLink>
      </Nav.Link>
      <Nav.Link className="navItem hidden">
        <NavLink to="/clients">
            <div className="navItemImg">
                <i className="fa-solid fa-user-gear fa-5x"></i>
            </div>
            <p>Employés</p>            
        </NavLink>
      </Nav.Link>
    </Nav>
  );
}
