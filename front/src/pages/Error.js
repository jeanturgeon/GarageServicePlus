import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import styles from "./error.module.css";
import { IconError } from "../components/UI/icons.styles";

const ReturnButton = styled.button`
  background-color: #faf2ce;
  font-family: "Roboto";
  padding: 0.5rem;
`;

export default function ErrroPage() {
  return (
    <Container fluid className={styles["main-container"]}>
      <Row>
        <Col xs={12} className={styles["error-page-header"]}>
          <IconError />
        </Col>
      </Row>
      <Row>
        <Col xs={12} className={styles["error-body"]}>
          <h1>Oops...une erreur est survenue</h1>
        </Col>
      </Row>
      <Col xs={12} className={styles["error-body"]}>
        <Row >            
            <NavLink to='/'>
                <ReturnButton>Retour à la page de connexion</ReturnButton>
            </NavLink>
        </Row>
      </Col>
    </Container>
  );
}
