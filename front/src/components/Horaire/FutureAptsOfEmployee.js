import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { NavLink } from 'react-router-dom'

import { getAptsByIdEmployee } from '../../util/routes'
import styles from '../../pages/Client/client.module.css'
import { getSecondNextMonday } from '../../util/helper';

let now = new Date(Date.now() - 86400000);
const secondFridayStr = getSecondNextMonday(4).toLocaleDateString("en-CA");
const secondFriday = getSecondNextMonday(4);

export default function FutureAptsOfEmployee(props) {
    const [futureApts, setFutureApts] = useState([]);

    useEffect(() => {
        getAptsByIdEmployee(props.idEmploye)
            .then((response) => {
                const futureAptsTemp = response.filter(apt => new Date(apt.date) > now).filter(apt => new Date(apt.date) <= secondFriday);
                setFutureApts(futureAptsTemp);
            })

    }, []);

    return (
        <div className={styles['card-container']}>
            <Card className="mb-5">
                <Card.Header as='h5' className={styles["card-header"]}>
                    <div className='d-flex justify-content-between'>
                        Rendez-vous assignés jusqu'au {secondFridayStr}
                    </div>
                </Card.Header>
                <Card.Body>
                    {futureApts.length > 0 ?
                        futureApts.map((futureApt, index) => {
                            return (
                                <div key={index}>
                                    <p>
                                        <NavLink to={`/nav/appointment/${futureApt.idRendezVous}`} className={styles.link}>
                                            {futureApt.date.substring(0, 10)} &nbsp;:&nbsp;&nbsp;
                                            <b>
                                                {futureApt.heure.substring(0, 5)} - {futureApt.heureFin.substring(0, 5)}
                                            </b> &nbsp;
                                            <span style={{ fontStyle: "italic" }}>
                                                {futureApt.description !== null ? futureApt.description : ""}
                                            </span>
                                        </NavLink>
                                    </p>
                                </div>
                            )
                        }) :
                        <p><i>Aucune plage de disponibilité à venir</i></p>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}