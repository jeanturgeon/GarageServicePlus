import { useContext } from 'react'
import {Card} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'

import { AuthContext } from '../../util/auth.context'
import styles from '../../pages/Employe/employe.module.css'
import { IconEditWhite } from '../UI/icons.styles'

export default function EmployeInformation(props) {

  const {isAdmin} = useContext(AuthContext)

    return (
      <div className={styles['card-container']}>
          <Card className='mb-5'>
          <Card.Header as='h5' className={styles["card-header"]}>
            <div className='d-flex justify-content-between'>
              Coordonnées
              <NavLink to={`/nav/update-employe/${props.employeDetail[0].idEmploye}`} className={styles.link} >
                {isAdmin ? <IconEditWhite /> :''}
              </NavLink>
            </div>
          </Card.Header>
          <Card.Body className={styles["card-body"]}>      
          <p>Id de l'employé : {props.employeDetail[0].idEmploye}</p>       
          <p>({props.employeDetail[0].telephone.substring(0,3)}) {props.employeDetail[0].telephone.substring(3,6)}-{props.employeDetail[0].telephone.substring(6,10)}</p>
            {props.employeDetail[0].courriel !== '' && <p>{props.employeDetail[0].courriel}</p>}                      
          </Card.Body>
        </Card>
      </div>
    )
}