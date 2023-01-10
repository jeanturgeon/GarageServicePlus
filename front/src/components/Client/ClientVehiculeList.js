import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import {NavLink} from 'react-router-dom'
import {getVehiculeByClient} from '../../util/routes'
import styles from '../../pages/Client/client.module.css'

export default function ClientVehiculeList(props) {
    const [vehicules, setVehicules] = useState([]);


    useEffect(()=> {
        getVehiculeByClient(props.idClient)
            .then((response) => {                
                setVehicules(response)
            })
    },[]);

    return (
        <div className={styles['card-container']}>
            <Card className="mb-5">
                <Card.Header as='h5' className={styles["card-header"]}>
                    <div className='d-flex justify-content-between'>
                        Véhicule(s)
                        <NavLink to={`/add-vehiculeClient/${props.idClient} `} className={styles.link} >
                            <i className="fa-solid fa-circle-plus fa-lg "></i>
                        </NavLink>
                    </div>
                </Card.Header>
                <Card.Body>
                    {vehicules.length > 0 ?                     
                            vehicules.map((vehicule, index) => {
                                return (
                                    <div key={index} className={styles['vehicule-list-item']}>
                                        <NavLink to={`/update-vehicule/${vehicule.idVehiculeClient}`}>
                                            <i className="fa-solid fa-pen-to-square me-2"></i>
                                        </NavLink>

                                        <NavLink to={`/vehiculeClient/${vehicule.idVehiculeClient}`}>
                                            <p className={styles['vehicule-item']}>{vehicule.nomMarque} {vehicule.modele} {vehicule.annee}</p>
                                        </NavLink>
                                    </div>
                                )
                            }) :
                            <p><i>Aucun véhicule associé à ce client</i></p>                   
                    }
                </Card.Body>
            </Card>
        </div>
    )
}