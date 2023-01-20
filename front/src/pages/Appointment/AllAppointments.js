import { useContext } from "react";
import { useLoaderData, NavLink } from "react-router-dom";
import { getApt } from "../../util/routes";
import { Row, Col } from "react-bootstrap";

import { AuthContext } from "../../util/auth.context";
import AppointmentList from "../../components/Appointment/AppointmentList";
import { IconAdd } from "../../components/UI/icons.styles";

export default function AllAppointments() {
  const {isAdmin} = useContext(AuthContext)

  let now = new Date().getTime();
  const allAppointments = useLoaderData();
  const futureApt = allAppointments.filter((apt) => new Date(apt.date.substring(0, 10) + " " + apt.heure.substring(0, 8)).getTime() > now);

  const List = () => {
    return (
      <>
        <Row>
          <Col xs={8}>
            <h1 className="mb-3">Rendez-vous à venir</h1>
          </Col>
          <Col className="addButton">
            <NavLink to="/nav/add-appointment">
              <span>
                <IconAdd />
              </span>
            </NavLink>
          </Col>
        </Row>
        <Row>
          <AppointmentList appointments={futureApt} />
        </Row>
      </>
    );
  };

  return (
    <>
      {isAdmin ? <List /> : ''}
    </>
  );
}

export function loader() {
  return getApt();
}
