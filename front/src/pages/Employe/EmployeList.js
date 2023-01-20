import { useContext } from 'react';
import {Row, Col, Table} from 'react-bootstrap';

import { AuthContext } from '../../util/auth.context';
import {getAllEmploye} from '../../util/routes';
import { NavLink, useLoaderData } from 'react-router-dom';
import {IconInfoCircle, IconAddShifts, IconAdd} from '../../components/UI/icons.styles';


export default function EmployeList() {
    const {isAdmin} = useContext(AuthContext)
    
    const employes = useLoaderData();

    const List = () => {
        return (
            <>
            <Row>
                <Col xs={5}>
                    <h1 className='mb-3'>Répertoire des employés</h1>
                </Col>
                <Col className='addButton'>
                    <NavLink to="/nav/add-employe">
                        <IconAdd />
                    </NavLink>
                </Col>            
            </Row>        
            <Table striped>
                <thead>
                    <tr>
                        <th style={{width:'8%'}}>Id employé</th>
                        <th style={{width:'16%'}}>Prénom</th>
                        <th style={{width:'19%'}}>Nom</th>    
                        <th style={{width:'17%'}}>Téléphone</th>                     
                        <th style={{width:'20%'}}>Courriel</th>   
                        <th style={{width:'5%'}}></th>        
                        <th style={{width:'5%'}}></th>
                    </tr>
                </thead>
                <tbody>
                    {employes.map((employe, index) => (
                        <tr key={index}>          
                            <td>{employe.idEmploye}</td>
                            <td>{employe.prenomEmploye}</td>            
                            <td>{employe.nomEmploye}</td>
                            <td>{`(${employe.telephone.substring(0,3)}) ${employe.telephone.substring(3,6)}-${employe.telephone.substring(6,10)}`}</td>                         
                            <td>{employe.courriel}</td>
                            <td>
                                <NavLink to={`/nav/add-shift/${employe.idEmploye}`}>
                                    <IconAddShifts />
                                </NavLink>
                            </td>                   
                            <td>
                                <NavLink to={`/nav/employe/${employe.idEmploye}`}>
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
    );
}


export function loader() {
    return getAllEmploye();
}
