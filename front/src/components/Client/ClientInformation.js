import {Card} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import styles from '../../pages/Client/client.module.css'

export default function ClientInformation(props) {
    return (
      <div className={styles['card-container']}>
          <Card className='mb-5'>
          <Card.Header as='h5' className={styles["card-header"]}>
            <div className='d-flex justify-content-between'>
              Coordonnées
              <NavLink to={`/update-client/${props.clientDetail[0].idClient}`} className={styles.link} >
                <i className="fa-solid fa-pen-to-square fa-lg"></i>
              </NavLink>
            </div>
          </Card.Header>
          <Card.Body className={styles["card-body"]}>            
            {(props.clientDetail[0].apt !== null && props.clientDetail[0].apt !== '') ? <p>{`${props.clientDetail[0].apt}-`}{props.clientDetail[0].adresse}</p> : <p>{props.clientDetail[0].adresse}</p>}
            <p>{props.clientDetail[0].ville}, {props.clientDetail[0].province}</p>
            <p>{props.clientDetail[0].codePostal.substring(0,3).toUpperCase()} {props.clientDetail[0].codePostal.substring(3,6).toUpperCase()}</p>
            <p>({props.clientDetail[0].telephone.substring(0,3)}) {props.clientDetail[0].telephone.substring(3,6)}-{props.clientDetail[0].telephone.substring(6,10)}</p>
            {props.clientDetail[0].courriel !== '' && <p>{props.clientDetail[0].courriel}</p>}            
          </Card.Body>
        </Card>
      </div>
    )
}