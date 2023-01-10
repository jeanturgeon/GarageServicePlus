import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { NavLink } from 'react-router-dom'
import { getRDVByIdClient } from '../../util/routes'
import styles from '../../pages/Client/client.module.css'

let now = new Date().getTime();
let allApts = [];

export default function PassedAppointments(props) {
    const [PastApts, setpastApts] = useState([]);

    useEffect(() => {
        getRDVByIdClient(props.idClient)
            .then((response) => {                
                const pastAptTemp = response.filter(apt => new Date(apt.date.substring(0,10) + ' ' + apt.heure.substring(0,8)).getTime() < now);
                setpastApts(pastAptTemp);
            })
        
    }, []);

    return (
        <div className={styles['card-container']}>
            <Card className="mb-5">
                <Card.Header as='h5' className={styles["card-header"]}>
                    <div className='d-flex justify-content-between'>
                        Rendez-vous passés
                    </div>
                </Card.Header>
                <Card.Body>
                    {PastApts.length > 0 ?
                        PastApts.map((PastApt, index) => {
                            return (
                                <div key={index}>
                                    <NavLink style={{ color: 'black' }} to={`/appointment/${PastApt.idRendezVous}`}>
                                        <p>{PastApt.date.substring(0, 10)} - {PastApt.heure.substring(0, 5)}</p>
                                    </NavLink>
                                </div>
                            )
                        }) :
                        <p><i>Aucun rendez-vous</i></p>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}