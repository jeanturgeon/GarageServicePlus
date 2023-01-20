import { Container, Row, Col } from "react-bootstrap";

import logo from '../logo.png'
import { LoginForm } from "../components/Authentication/login-form";
import { RegistrationForm } from "../components/Authentication/registration-form";

import styles from './authentication.module.css'

export default function Authentication() {
    return(
        <Container fluid className={styles['main-container']}>
            <Row >                
                <Col xs={12}>                 
                    <div className={styles['logo-container']}>                    
                        <img className={styles['logo-login']} src={logo} alt='logo' />                    
                    </div>                    
                 
                </Col>                    
            </Row>
            <Row>
                <Col md={1}/>
                <Col md={4}>
                    <div className={styles['form-container']}><RegistrationForm /></div>
                </Col>            
                <Col md={2}/>
                <Col md={4}>
                    <div className={styles['form-container']}><LoginForm /></div>
                </Col>                           
            </Row>            
        </Container>
    )
}


