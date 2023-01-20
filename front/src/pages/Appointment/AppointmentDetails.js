import { useContext } from 'react';
import { useLoaderData, useNavigate, NavLink } from 'react-router-dom'
import {Button, Card, ListGroup} from 'react-bootstrap';

import { getAptById } from '../../util/routes'
import DeleteAptButton from '../../components/Appointment/DeleteAptButton'
import { AuthContext } from '../../util/auth.context';

export default function AppointmentDetails() {
  const {isAdmin} = useContext(AuthContext)
  const aptDetails = useLoaderData();
  const navigate = useNavigate();

  const handlePreviousPage = () => {
    navigate(-1);
  };

  return (

<div className="Appointmentdetails">
    <Card>
      <Card.Header as="h3" style={{ background: '#10222E', color: 'white' }}>
        Détail du rendez-vous
        { isAdmin ? <DeleteAptButton aptDetails={aptDetails} /> :'' }        
      </Card.Header>
      {aptDetails.map((aptD) => (
        <Card.Body style={{ background: '#7B9EA8', color: 'white' }}>
          <Card.Title as="h4"><NavLink to={`/nav/client/${aptD.idClient}`}>{aptD.prenom} {aptD.nom}</NavLink></Card.Title>
            <ListGroup variant="flush">
              <div className="fw-bold">Numéro de téléphone:</div>
              <ListGroup.Item>{aptD.telephone}</ListGroup.Item>
              <div className="fw-bold">Véhicule:</div>
              <ListGroup.Item><NavLink to={`/nav/vehiculeClient/${aptD.idVehiculeClient}`}>{aptD.nomMarque} {aptD.modele} {aptD.annee}</NavLink></ListGroup.Item>
              <div className="fw-bold">Immatriculation:</div>
              <ListGroup.Item>{aptD.numeroPlaque}</ListGroup.Item>
              <div className="fw-bold">Kilométrage:</div>
              <ListGroup.Item>{aptD.kilometrage} Km</ListGroup.Item>
              <div className="fw-bold">Type de service:</div>
              <ListGroup.Item>{aptD.nomTypeService}</ListGroup.Item>
              <div className="fw-bold">Date du rendez-vous:</div>
              <ListGroup.Item>{aptD.date.substring(0, 10)}</ListGroup.Item>
              <div className="fw-bold">Heure:</div>
              <ListGroup.Item>{aptD.heure.substring(0, 5)}</ListGroup.Item>
              <div className="fw-bold">Durée:</div>
              <ListGroup.Item>{aptD.dureeTotal} Minutes</ListGroup.Item>
              <div className="fw-bold">Mécanicien-ne:</div>
              <ListGroup.Item><NavLink to={`/nav/employe/${aptD.idEmploye}`}>{aptD.prenomEmploye} {aptD.nomEmploye}</NavLink></ListGroup.Item>
              <div className="fw-bold">Description:</div>
              <ListGroup.Item>{aptD.description}</ListGroup.Item>
            </ListGroup>
        </Card.Body>
      ))
      }
      <Card.Footer style={{ background: '#10222E' }}>
          <Button onClick={handlePreviousPage} variant="outline-light">Retour à la page précédente</Button>
      </Card.Footer>
    </Card>
    </div>
  );
}


export function loader({ params }) {
  const idRendezVous = params.idRendezVous;
  return getAptById(idRendezVous);
} 
