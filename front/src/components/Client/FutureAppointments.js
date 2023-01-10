import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { NavLink } from 'react-router-dom'
import { getRDVByIdClient } from '../../util/routes'
import styles from '../../pages/Client/client.module.css'

let now = new Date().getTime();
let allApts = [];

export default function FutureAppointments(props) {
    const [FutureApts, setFutureApts] = useState([]);

    useEffect(() => {
        getRDVByIdClient(props.idClient)
            .then((response) => {                
                const futureAptTemp = response.filter(apt => new Date(apt.date.substring(0,10) + ' ' + apt.heure.substring(0,8)).getTime() > now);
                setFutureApts(futureAptTemp);
        })
    }, []);

    return (
        <div className={styles['card-container']}>
            <Card className="mb-5">
                <Card.Header as='h5' className={styles["card-header"]}>
                    <div className='d-flex justify-content-between'>
                        Rendez-vous à venir
                    </div>
                </Card.Header>
                <Card.Body>
                    {FutureApts.length > 0 ?
                        FutureApts.map((FutureApt, index) => {
                            return (
                                <div key={index}>
                                    <NavLink style={{ color: 'black' }} to={`/appointment/${FutureApt.idRendezVous}`}>
                                        <p>{FutureApt.date.substring(0, 10)} - {FutureApt.heure.substring(0, 5)}</p>
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