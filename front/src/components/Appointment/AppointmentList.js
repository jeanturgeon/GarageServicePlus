import { useContext } from "react";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";

import { IconEdit, IconInfoCircle } from "../UI/icons.styles";
import { AuthContext } from "../../util/auth.context";

export default function AppointmentList({ appointments }) {
  const {isAdmin} = useContext(AuthContext)

  return (
    <>
    
      <Table striped>
        <thead>
          <tr>
          {
            isAdmin ? <th style={{ width: "5%" }}>Modifier</th> : ''
          }            
            <th style={{ width: "10%" }}>Date</th>
            <th style={{ width: "8%" }}>Heure</th>
            <th style={{ width: "12%" }}>Client</th>
            <th style={{ width: "15%" }}>Véhicule</th>
            <th style={{ width: "20%" }}>Description</th>
            <th style={{ width: "20%" }}>Mécanicien</th>
            <th style={{ width: "5%" }}></th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt, index) => (
            <tr key={index}>
            {
              isAdmin ? (
                <td className="ps-4">
                  <NavLink to={`/nav/update-appointment/${apt.idRendezVous}`}>
                    <IconEdit />
                  </NavLink>
                </td>
              ):''
            }              
              <td>{apt.date.substring(0, 10)}</td>
              <td>{apt.heure.substring(0, 5)}</td>
              <td>
                <NavLink to={`/nav/client/${apt.idClient}`}>{apt.prenom}&nbsp;{apt.nom}</NavLink>
              </td>
              <td>
                <NavLink to={`/nav/vehiculeClient/${apt.idVehiculeClient}`}>{apt.nomMarque}&nbsp;{apt.modele}&nbsp;{apt.annee}</NavLink>
              </td>
              <td>
                {apt.description}
              </td>
              <td>
                <NavLink to={`/nav/employe/${apt.idEmploye}`}>{apt.prenomEmploye} {apt.nomEmploye}</NavLink>
              </td>
              <td>
                <NavLink to={`/nav/appointment/${apt.idRendezVous}`}> <IconInfoCircle /></NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
