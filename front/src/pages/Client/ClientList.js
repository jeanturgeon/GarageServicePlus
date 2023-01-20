import { useContext } from 'react';
import {Row, Col, Table } from 'react-bootstrap';
import { NavLink, useLoaderData } from 'react-router-dom';

import { AuthContext } from '../../util/auth.context';
import {getAllClients} from '../../util/routes';
import { IconEdit, IconInfoCircle, IconAdd } from '../../components/UI/icons.styles';

export default function ClientList() {
    const {isAdmin} = useContext(AuthContext);

    const clients = useLoaderData();

    const List = () => {
        return (
            <>
                 <Row>
            <Col xs={4}>
                <h1 className='mb-3'>Répertoire des clients</h1>
            </Col>
            <Col className='addButton'>
                <NavLink to="/nav/add-client">
                    <IconAdd />
                </NavLink>
            </Col>            
        </Row>        
        <Table striped>
            <thead>
                <tr>
                    <th style={{width:'7.5%'}}>Modifier</th>
                    <th style={{width:'7.5%'}}>No. Client</th>
                    <th style={{width:'25%'}}>Nom</th>
                    <th style={{width:'25%'}}>Adresse courriel</th>
                    <th style={{width:'25%'}}>Téléphone</th>                    
                    <th style={{width:'5%'}}></th>
                </tr>
            </thead>
            <tbody>
                {clients.map((client, index) => (
                    <tr key={index}>
                        <td className='ps-4'>
                            <NavLink to={`/nav/update-client/${client.idClient}`}>
                                <IconEdit />
                            </NavLink>
                        </td>                        
                        <td>{client.idClient}</td>
                        <td>{client.prenom}&nbsp;{client.nom}</td>                        
                        <td>{client.courriel}</td>
                        <td>{`(${client.telephone.substring(0,3)}) ${client.telephone.substring(3,6)}-${client.telephone.substring(6,10)}`}</td>
                        <td>
                            <NavLink to={`/nav/client/${client.idClient}`}>
                                <IconInfoCircle />
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
    return (
        <>
            {isAdmin ? <List /> : ''}
        </>
    )
}


export function loader() {
    return getAllClients();
}
