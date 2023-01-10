import { Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";

export default function AppointmentList({ appointments }) {
  return (
    <>
    
      <Table striped>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>Modifier</th>
            <th style={{ width: "10%" }}>Date</th>
            <th style={{ width: "10%" }}>Heure</th>
            <th style={{ width: "20%" }}>Client</th>
            <th style={{ width: "20%" }}>Véhicule</th>
            <th style={{ width: "25%" }}>Description</th>
            <th style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt, index) => (
            <tr key={index}>
              <td className="ps-4">
                <NavLink to={`/update-appointment/${apt.idRendezVous}`}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </NavLink>
              </td>
              <td>{apt.date.substring(0, 10)}</td>
              <td>{apt.heure.substring(0, 5)}</td>
              <td>
                {apt.prenom}&nbsp;{apt.nom}
              </td>
              <td>
                {apt.nomMarque}&nbsp;{apt.modele}&nbsp;{apt.annee}
              </td>
              <td>{apt.description}</td>
              <td>
                <NavLink to={`/appointment/${apt.idRendezVous}`}>voir détails</NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
