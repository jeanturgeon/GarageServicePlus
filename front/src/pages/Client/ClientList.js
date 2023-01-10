import {Row, Col, Table, Nav} from 'react-bootstrap';
import {getAllClients} from '../../util/routes';
import { NavLink, useLoaderData } from 'react-router-dom';

export default function ClientList() {


    const clients = useLoaderData();

    return (
        <>
        <Row>
            <Col xs={4}>
                <h1 className='mb-3'>Répertoire des clients</h1>
            </Col>
            <Col className='addButton'>
                <NavLink to="/add-client">
                    <span><i className="fa-solid fa-circle-plus fa-2x"></i></span>
                </NavLink>
            </Col>            
        </Row>        
        <Table striped>
            <thead>
                <tr>
                    <th style={{width:'10%'}}>Modifier</th>
                    <th style={{width:'25%'}}>Nom</th>
                    <th style={{width:'25%'}}>Adresse courriel</th>
                    <th style={{width:'25%'}}>Téléphone</th>                    
                    <th style={{width:'15%'}}></th>
                </tr>
            </thead>
            <tbody>
                {clients.map((client, index) => (
                    <tr key={index}>
                        <td className='ps-4'>
                            <NavLink to={`/update-client/${client.idClient}`}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </NavLink>
                        </td>                        
                        <td>{client.prenom}&nbsp;{client.nom}</td>                        
                        <td>{client.courriel}</td>
                        <td>{`(${client.telephone.substring(0,3)}) ${client.telephone.substring(3,6)}-${client.telephone.substring(6,10)}`}</td>
                        <td>
                            <NavLink to={`/client/${client.idClient}`}>
                                voir détails
                            </NavLink>
                        </td>
                    </tr>                    
                 ))
                }
            </tbody>
        </Table>
        </>
    )
}


export function loader() {
    return getAllClients();
}
