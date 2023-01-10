import AppointmentList from "../../components/Appointment/AppointmentList";
import { useLoaderData, NavLink } from "react-router-dom";
import { getApt } from "../../util/routes";
import { Row, Col } from "react-bootstrap";

export default function AllAppointments() {
  let now = new Date().getTime();
  const allAppointments = useLoaderData();
  const futureApt = allAppointments.filter(apt => new Date(apt.date.substring(0,10) + ' ' + apt.heure.substring(0,8)).getTime() > now)

  return (
    <>
      <Row>
        <Col xs={8}>
          <h1 className="mb-3">Rendez-vous à venir</h1>
        </Col>
        <Col className="addButton">
          <NavLink to="/add-appointment">
            <span>
              <i className="fa-solid fa-circle-plus fa-2x"></i>
            </span>
          </NavLink>
        </Col>
      </Row>
      <Row>
        <AppointmentList appointments={futureApt} />
      </Row>
    </>
  );
}

export function loader() {
  return getApt();
}
