import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./employe.module.css";
import { getEmployeById, deactivateEmploye } from "../../util/routes";
import EmployeInformation from "../../components/Employe/EmployeInformation";
import FutureShifts from "../../components/Horaire/FutureShifts";
import FutureAptsOfEmployee from "../../components/Horaire/FutureAptsOfEmployee";
import { AuthContext } from "../../util/auth.context";

export default function EmployeDetails() {
  const { isAdmin, employeeId } = useContext(AuthContext);

  const employeDetail = useLoaderData();
  const navigate = useNavigate();

  const deactivate = () => {
    deactivateEmploye(employeDetail[0].idEmploye).then((response) => {
      if (response === 1) {
        navigate("/nav/employes");
      } else {
        alert("Une erreur est survenue!");
      }
    });
  };

  const handlePreviousPage = () => {
    navigate(-1);
  };

  const Details = () => {
    return (
      <Container className={styles.container}>
      {/* Title section*/}
      <Row className={styles["section-header"]}>
        <Col md={3}>
          <button onClick={handlePreviousPage} className={styles["btn-employe-detail"]}>
            Retour à la page précédente
          </button>
        </Col>
        <Col md={6}>
          <h1 className={styles.employeName}>
            {employeDetail[0].prenomEmploye} {employeDetail[0].nomEmploye}
          </h1>
        </Col>
      </Row>
      <Row>
        {/* Coordonnées*/}
        <Col md={6}>
          <EmployeInformation employeDetail={employeDetail} />
          <FutureAptsOfEmployee idEmploye={employeDetail[0].idEmploye} />
        </Col>
        {/* Plages de disponibilité */}
        <Col md={6}>
          <FutureShifts idEmploye={employeDetail[0].idEmploye} />
        </Col>
      </Row>

      {/* Footer section*/}
      {isAdmin ? (
        <Row className={styles.footer}>
          <Col md={3}>
            <button className={styles["btn-deactivate"]} onClick={deactivate}>
              Désactiver l'employé
            </button>
          </Col>
          <Col md={9}></Col>
        </Row>
      ):''}
    </Container>
    )
  }

  return (
    <>
      {isAdmin || (employeeId === employeDetail[0].idEmploye) ? <Details /> : ''}
    </>    
  );
}

export function loader({ params }) {
  const idEmploye = params.idEmploye;
  return getEmployeById(idEmploye);
}
