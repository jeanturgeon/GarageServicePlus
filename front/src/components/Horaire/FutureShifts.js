import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { NavLink } from 'react-router-dom'

import { getShiftsByIdEmployee } from '../../util/routes'
import styles from '../../pages/Client/client.module.css'
import { getSecondNextMonday } from '../../util/helper';
import { IconAddWhite, IconEdit } from "../UI/icons.styles"

let now = new Date(Date.now() - 86400000);
const secondFridayStr = getSecondNextMonday(4).toLocaleDateString("en-CA");
const secondFriday = getSecondNextMonday(4);

export default function FutureShifts(props) {
    const [futureShifts, setFutureShifts] = useState([]);

    useEffect(() => {
        getShiftsByIdEmployee(props.idEmploye)
            .then((response) => {
                const futureShiftsTemp = response.filter(shift => new Date(shift.dateDispo) > now).filter(shift => new Date(shift.dateDispo) <= secondFriday);
                setFutureShifts(futureShiftsTemp);
            })

    }, []);

    return (
        <div className={styles['card-container']}>
            <Card className="mb-5">
                <Card.Header as='h5' className={styles["card-header"]}>
                    <div className='d-flex justify-content-between'>
                        Plages de disponibilité jusqu'au {secondFridayStr}
                        <NavLink to={`/nav/add-shift/${props.idEmploye}`} className={styles.link} title="Ajouter des plages de disponibilité" >
                            <IconAddWhite />
                        </NavLink>
                    </div>
                </Card.Header>
                <Card.Body>
                    {futureShifts.length > 0 ?
                        futureShifts.map((futureShift, index) => {
                            return (
                                <div key={index} style={{display: "flex"}}>
                                    <NavLink to={`/nav/update-shift/${futureShift.idPlageDisponibilite}`}>
                                        <IconEdit className="me-2 pb-1"/>
                                    </NavLink>
                                    {parseInt(futureShift.conge) === 1 ?
                                        <p>{futureShift.dateDispo.substring(0, 10)} &nbsp;:&nbsp; <span style={{ backgroundColor: "#FAF2CE" }}><b>Congé</b></span></p> :
                                        <p>{futureShift.dateDispo.substring(0, 10)} &nbsp;:&nbsp; <b>{futureShift.hrsDebutJournee.substring(0, 5)} - {futureShift.hrsFinJournee.substring(0, 5)}</b> &nbsp;(dîner : {futureShift.hrsDebutDiner.substring(0, 5)} - {futureShift.hrsFinDiner.substring(0, 5)})</p>}
                                </div>
                            )
                        }) :
                        <p><i>Aucune plage de disponibilité à venir d'ici le {secondFridayStr}</i></p>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}