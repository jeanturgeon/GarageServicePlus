import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

import {Input, AuthButton, FormTitle} from './authentication.styles';
import {loginWithEmailAndPassword} from '../../util/firebase.utils';
import { getEmployeebyFirebaseId } from "../../util/routes";

const defaultFormFields = {
    email: "",
    password: "",    
  };

export const LoginForm = () => {
    const navigate = useNavigate();    

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;    

    const handleChange = (event) => {
        const { name, value } = event.target; //name of the input triggering the event
        setFormFields({ ...formFields, [name]: value });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
            const { user } = await loginWithEmailAndPassword(email, password);    
            if(user) {               
                const response = await getEmployeebyFirebaseId(user.uid);                                
                if (response[0].estActif === 1) {                                        
                    navigate("/nav/home");
                } else {
                    alert('Aucun employé actif trouvé avec ce compte')
                    return;
                }                
            }            
        } catch (error){
            switch(error.code) {
                case 'auth/user-not-found':
                    alert('email address not found');
                    break
                case 'auth/wrong-password':
                    alert("Incorrect password");
                    break
                default:
                    console.log(error);
            }
        }
    };

    return (
        <div>
            <FormTitle >Connexion</FormTitle>
            <Form onSubmit={handleSubmit}>
                <Input type='email' required placeholder="courriel" name="email" onChange={handleChange} value={email} />
                <Input type='password' required placeholder="mot de passe" name="password" onChange={handleChange} value={password}  />
                <AuthButton>Se connecter</AuthButton>
            </Form>
        </div>
    )
}