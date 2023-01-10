import VerticalNav from './VerticalNav'
import {Container, Row, Col} from 'react-bootstrap'
import Header from './Header'
import styles from './uistyles.module.css'
import {Outlet} from 'react-router-dom'

export default function RootLayout ({children}) {
    return (
        <>
            <Container fluid>            
                <Row >
                    <Col xs={2}>  
                        <div className={styles.navContainer}>
                            <VerticalNav />                        
                        </div>                      
                    </Col>
                    <Col xs={10}>
                        <Header />
                        <main>
                            <Outlet />
                        </main>
                    </Col>
                </Row>                
            </Container>            
        </>
    )
}
