import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './uistyles.module.css'
import { AuthContext } from '../../util/auth.context'
import {getEmployeebyFirebaseId} from '../../util/routes';
import { logOutUser } from '../../util/firebase.utils';
import { IconAmin } from './icons.styles';


export default function Header() {
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');

    const navigate = useNavigate();

    const {currentUser, isAdmin} = useContext(AuthContext)
    
    const getEmployeeName = async () => {
        const response = await getEmployeebyFirebaseId(currentUser.uid);        
        setPrenom(response[0].prenomEmploye);
        setNom(response[0].nomEmploye);
    }

    useEffect(()=>{
        getEmployeeName();
    },[currentUser, isAdmin])

    const logOut = () => {        
        logOutUser();
        navigate('/');
    }

    return (
        <header className={styles.header}>                    
            <div>
                Connecté en tant que: {prenom} {nom}
                {isAdmin ? <IconAmin className='pb-1'/> : ''}
            
            </div>            
            <span className={styles["header-span"]} onClick={logOut}>Déconnecter</span>
            
        </header>
    )

}