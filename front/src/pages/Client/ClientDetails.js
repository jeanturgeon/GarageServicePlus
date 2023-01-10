import styles from './client.module.css'
import { deactivateClient, getClientById } from "../../util/routes";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import ClientInformation from '../../components/Client/ClientInformation';
import ClientVehiculeList from "../../components/Client/ClientVehiculeList";
import FutureAppointments from "../../components/Client/FutureAppointments";
import PassedAppointments from "../../components/Client/PassedAppointments";

export default function ClientDetails() {
  const clientDetail = useLoaderData();
  const navigate = useNavigate();

  const deactivate = () => {
    deactivateClient(clientDetail[0].idClient)
      .then((response) => {
        if (response === 1) {
          navigate("/clients");
        } else {
          alert("Une erreur est survenue!");
        }
      })
    
  }

  return (
    <Container className={styles.container}>
      {/* Title section*/}
      <Row className={styles['section-header']}>
        <Col md={3}>
          <NavLink to='/clients'>
            <button className={styles['btn-client-detail']}>Retour à la liste de clients</button>
          </NavLink>          
        </Col>
        <Col md={6}>
          <h1 className={styles.clientName}>{clientDetail[0].prenom} {clientDetail[0].nom}</h1>
        </Col>
        <Col md={3} className='d-flex justify-content-end'>
          <NavLink to='/add-appointment'>
            <button className={styles['btn-client-detail']}>Créer un rendez-vous</button>
          </NavLink>          
        </Col>
      </Row>
      <Row>
        {/* Coordonnées*/}
        <Col md={6}>
          <ClientInformation clientDetail={clientDetail}/>
        </Col>
        {/* RDV passés*/}
        <Col md={6}>
          <PassedAppointments idClient={clientDetail[0].idClient}/>
        </Col>
      </Row>
      <Row>
        {/* Véhicules*/}
        <Col md={6}>            
          <ClientVehiculeList idClient={clientDetail[0].idClient}/>
        </Col>
        {/* RDV futurs*/}
        <Col md={6}>
          <FutureAppointments idClient={clientDetail[0].idClient}/>
        </Col>
      </Row>
      {/* Footer section*/}
      <Row className={styles.footer}>
        <Col md={3}>
          <button className={styles['btn-deactivate']} onClick={deactivate}>Désactiver le client</button>
        </Col>
        <Col md={9}>
        </Col>
      </Row>
    </Container>
  );
}

export function loader({ params }) {
  const idClient = params.idClient;
  return getClientById(idClient);
}
